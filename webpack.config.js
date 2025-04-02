const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: './templates/index.html',
    fileName: './index.html',
});
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
});

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'production',
    entry: './index.js',
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
      filename: "bundled.js",
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "postcss-loader",
                  "sass-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'assets/[name].[ext]',
                    },
                  },
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      query: {
                        mozjpeg: {
                          progressive: true,
                        },
                        gifsicle: {
                          interlaced: true,
                        },
                        optipng: {
                          optimizationLevel: 7,
                        },
                      },
                    },
                  },
                ],
              },
        ]
    },
    plugins: [htmlWebpackPlugin, miniCssExtractPlugin, new Dotenv({systemvars: true})],
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        alias: {
            src: path.resolve(__dirname, 'src'),
            routes: path.resolve(__dirname, 'src/routes'),
            pages: path.resolve(__dirname, 'src/pages'),
            actions: path.resolve(__dirname, 'src/actions'),
            actionTypes: path.resolve(__dirname, 'src/actionTypes'),
            reducers: path.resolve(__dirname, 'src/reducers'),
            forms: path.resolve(__dirname, 'src/forms'),
            assets: path.resolve(__dirname, 'src/assets'),
            helpers: path.resolve(__dirname, 'src/helpers'),
        },
    },
performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
    devServer: {
      port: 8888,
      historyApiFallback: true,
      hot: true
  }
};