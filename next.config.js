/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    REGION: "ap-southeast-1",
    USERPOOL_ID: "ap-southeast-1_sst6vz7f4",
    CLIENT_ID: "51v8e3cto3ergq21niukpti5vn",
  },
  images: {
    domains: [
      "https://finhub172520-dev.s3.ap-southeast-1.amazonaws.com",
      "finhub172520-dev.s3.ap-southeast-1.amazonaws.com",
    ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
