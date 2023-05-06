import * as cardValidator from "card-validator";

export function validationCard(card_number, expiry_date, cvv) {
  const valid_card_number = cardValidator.number(card_number).isValid;
  const date = expiry_date.split("-");
  const valid_month = cardValidator.expirationMonth(date[1]).isValid;
  const valid_year = cardValidator.expirationYear(date[0]).isValid;
  const valid_cvv = cardValidator.cvv(cvv).isValid;

  return valid_card_number && valid_month && valid_year && valid_cvv;
}
