// module.exports = {
//   devServer: {
//     compress: true,
//     disableHostCheck: true,
//   },
// }
const webpack = require('webpack');
module.exports = {
  // devServer: {
  //    https: true,
  //    public : 'refividrio.com.mx'
  //   },
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