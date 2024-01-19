/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  env: {
    REGION: 'ap-southeast-1',
    USERPOOL_ID: 'ap-southeast-1_sst6vz7f4',
    CLIENT_ID: '51v8e3cto3ergq21niukpti5vn'
  },
  images: {
    domains: ['https://finhub172520-dev.s3.ap-southeast-1.amazonaws.com','finhub172520-dev.s3.ap-southeast-1.amazonaws.com'],
  },
}

module.exports = nextConfig
