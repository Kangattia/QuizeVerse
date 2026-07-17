/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    // @coinbase/onchainkit pulls in an optional "x402" payments module that
    // isn't fully published as installable packages. We don't use x402
    // payment features in Quizverse, so tell webpack to skip trying to
    // bundle it instead of failing the whole build over an unused feature.
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^@x402\//,
      })
    );
    return config;
  },
};

export default nextConfig;
