const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;


module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  const mergeConfig = merge(singleSpaWebpackConfig, {
    optimization: {
      runtimeChunk: false,
      splitChunks: false
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'parcel',
        filename: 'remoteEntry.js',
        exposes: {
          '.': './src/main.single-spa.ts'
        }
      })
    ]
  });
  return mergeConfig;
};
