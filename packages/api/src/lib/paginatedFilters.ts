import { Model } from "mongoose";
import { ERROR } from "../errors";
import { GeneralOrderType, PaginatedMovies } from "../gql/types";

type OrderFilter = Record<string, 1 | -1>;

export const paginator = async <T>(
  DBModel: Model<T>,
  type: "movies" | "cinemas",
  filter: Record<string, any>,
  currentPageArgs?: number | null,
  itemsPerPageArgs?: number | null,
  order?: string | null
) => {
  try {
    const itemsPerPage: number =
      itemsPerPageArgs || (await DBModel.countDocuments(filter));
    const currentPage: number = currentPageArgs || 1;

    const sortFilter: OrderFilter = {};

    if (order) {
      switch (order) {
        case GeneralOrderType.RecentLast:
          if (type === "movies") {
            sortFilter.release = 1;
          } else {
            sortFilter.updatedAt = 1;
          }
          break;
        case GeneralOrderType.RecentFirst:
          if (type === "movies") {
            sortFilter.release = -1;
          } else {
            sortFilter.updatedAt = -1;
          }
          break;
        case GeneralOrderType.NameAz:
          if (type === "movies") {
            sortFilter.title = 1;
          } else {
            sortFilter.name = 1;
          }
          break;
        case GeneralOrderType.NameZa:
          if (type === "movies") {
            sortFilter.title = -1;
          } else {
            sortFilter.name = -1;
          }
          break;
        default: // default recentFirst
          if (type === "movies") {
            sortFilter.release = -1;
          } else {
            sortFilter.updatedAt = -1;
          }
          break;
      }
    } else {
      sortFilter.createdAt = -1;
    }

    let stage;
    const commonStage = [
      { $sort: sortFilter },
      { $skip: itemsPerPage * (currentPage - 1) },
      { $limit: itemsPerPage === 0 ? 1 : itemsPerPage }
    ];

    if (type === "movies") {
      stage = [
        ...commonStage,
        {
          $project: {
            image: "$image",
            title: "$title",
            release: "$release",
            rating: "$rating"
          }
        },
        { $addFields: { id: "$_id" } },
        { $unset: "_id" }
      ];
    } else {
      stage = [
        ...commonStage,
        {
          $project: {
            name: "$name",
            address: "$address"
          }
        },
        { $addFields: { id: "$_id" } },
        { $unset: "_id" }
      ];
    }

    const aggregation = DBModel.aggregate();

    aggregation
      .match(filter)
      .facet({
        stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
        stage2: stage
      })
      .collation({
        locale: "es",
        numericOrdering: true,
        strength: 2
      })
      .unwind("$stage1")
      .project({
        totalNumber: "$stage1.count",
        page: { $floor: currentPage },
        pageSize: { $floor: itemsPerPage },
        totalPages: {
          $ceil: { $divide: ["$stage1.count", itemsPerPage] }
        },
        data: "$stage2"
      });

    const result = await aggregation.exec();

    if (result.length === 0) {
      return {
        data: [],
        page: 0,
        pageSize: 0,
        totalNumber: 0,
        totalPages: 0
      };
    }
    return result[0];
  } catch (e) {
    throw new Error(ERROR.INTERNAL_ERROR.message);
  }
};
