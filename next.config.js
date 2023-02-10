module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    async redirects() {
        return [
          {
            source: "/@timcavell",
            destination: "https://hachyderm.io/@timcavell",
            permanent: false,
            basePath: false,
          },
        ];
      },
    async rewrites() {
        return [
            {
              source: '/.well-known/webfinger',
              destination: '/api/.well-known/webfinger'
            }
        ];
      }
}
