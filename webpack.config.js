module.exports = {
  entry: {
    main: ['webpack/hot/dev-server', './main.js'],
  },
  output: {
    path: './',
    filename: '[name].js'
  },
  module: {
    loaders: [
       { test: /\.(js|jsx)/, exclude: /node_modules/, loader: 'react-hot!babel-loader'},
       { test: /\.css$/, loader: 'style-loader!css-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './',
	 port: 9285
  }
};
