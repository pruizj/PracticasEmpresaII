// next.config.js

module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.ts(x?)$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["next/babel"]
          }
        },
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }
      ]
    });

    return config;
  }
};
