/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    // API_BASE_URL: 'http://ec2-3-95-16-132.compute-1.amazonaws.com:5000',
    API_BASE_URL: 'http://localhost:5000',
    OCC_SECRET:'secret',
    OCC_CLIENT_ID:'trusted_client',
    BASE_SITE:'expresscommerce',
    
    RAZORPAY_KEY: 'rzp_test_I7dbsPCjK9fr1r',
    RAZORPAY_SECRET: 'gDvefARZoWKw4p6pr1x7JUeU',
    RAZORPAY_CURRENCE: 'INR',
  },
}

module.exports = nextConfig
