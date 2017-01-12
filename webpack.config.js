const path = require('path')

const webpack = require('webpack')

const DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: [ './src/index.jsx' ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  plugins: [
    ...(!DEV ? [new webpack.LoaderOptionsPlugin({ minimize: true, debug: false })] : []),
    ...(!DEV ? [new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })] : []),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          }
        ]
      },
      {
        test: /(\.png|\.jpeg|\.svg)/,
        include: /src/,
        use: {
          loader: 'url-loader',
          options: { limit: 1000 }
        }
      },
      {
        test: /\.css$/,
        include: /src/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              'modules': true,
              '-url': DEV,
              sourceMap: DEV,
              minimize: !DEV
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css']
  },
  devtool: DEV ? 'cheap-module-eval-source-map' : undefined,
  stats: {
    // Nice colored output
    colors: true
  }
}
