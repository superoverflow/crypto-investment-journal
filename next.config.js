module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com',
          port: '',
          pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'assets.xm-cdn.com',
            port: '',
            pathname: '/**',
          },
      ],
    },
  };