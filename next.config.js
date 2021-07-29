module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/websites',
          permanent: true,
        },
      ]
    },
    images: {
      domains: ["res.cloudinary.com"]
    },
    env: {
      apiSecret: '42istheanswer'
    }
  }