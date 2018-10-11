const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = (env, options) => {
    const isProduction = env && env.NODE_ENV && env.NODE_ENV !== 'development' ? true :
        options && options.mode === 'production' ? true : false;
    return {
        name: 'web',
        mode: isProduction ? 'production' : 'development',
        entry: {
            //we configure the hot reloader as a separate entry point to the application
            //'webpack-hot-middleware/client',

            client: './ClientApp/boot-client.tsx'
        },
        output: {
            path: path.resolve(__dirname, './wwwroot/dist'),
            publicPath: '/dist/',
            filename: 'bundle.js',
        },
        resolve: {
            //automatically infer '.ts' and '.tsx' when importing files
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: isProduction ?
                        [MiniCssExtractPlugin.loader, 'css-loader'] :
                        ['style-loader', 'css-loader'],
                },
                {
                    test: /\.tsx?$/,
                    include: path.resolve(__dirname, "./ClientApp/"),
                    loader: "awesome-typescript-loader"
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|ttf|otf|woff|woff2|eot)$/,
                    loader: 'url-loader?limit=4096'
                }
            ]
        },

        //see https://webpack.js.org/configuration/devtool/ for options
        devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",

        plugins: isProduction ? [
            new MiniCssExtractPlugin()
        ] : [
                //new webpack.HotModuleReplacementPlugin()
            ]
    }
}
module.exports = config;
