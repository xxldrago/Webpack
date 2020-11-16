const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [paths.src + '/index.js'],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: paths.src + '/index.pug',
      filename: 'index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, 
        use: ['babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true, // rjdckld
          root: paths.src, // Можно прописывать абсолютные пути внутри pug относительно указанного пути.
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i, 
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, 
        type: 'asset/inline',
        include: [
          paths.src + 'fonts',    // include - будет брать только из данных каталогов
          paths.src + 'node_modules', // Для подключения шрифтов из пакетов если на них есть ссылка
        ],
      },
    ],
  },
}
