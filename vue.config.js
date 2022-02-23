// module.exports = {
//   devServer: {
//     compress: true,
//     disableHostCheck: true,
//   },
// }
const webpack = require('webpack');
module.exports = {
    configureWebpack: {
      plugins: [
        new webpack.DefinePlugin({
          'process.env.FLUENTFFMPEG_COV': false
        })
      ]
    }
  }
  module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}