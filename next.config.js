module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    async rewrites() {
        return [
            {
              source: '/.well-known/webfinger',
              destination: '/api/.well-known/webfinger'
            }
        ];
      }
}
