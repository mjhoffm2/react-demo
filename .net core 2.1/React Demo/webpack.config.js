const path = require('path');
const webpack = require('webpack');

var config = (env, options) => ({
    name: 'web',
    mode: env.NODE_ENV === 'development' ?  'development' : 'production',
    entry: {
        //we configure the hot reloader as a separate entry point to the application
        //'webpack-hot-middleware/client',

        client: './ClientApp/src/web/boot-client.tsx'
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
                test:/\.css$/,
                use:['style-loader','css-loader'],
            },
            {
                test:/\.tsx?$/,
                include: path.resolve(__dirname, "./ClientApp/src/web/"),
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ttf|otf|woff|woff2|eot)$/,
                loader: 'url-loader?limit=25000'
            }
        ]
    },

    //see https://webpack.js.org/configuration/devtool/ for options
    devtool: "cheap-module-eval-source-map",

    //plugins: [
    //    new webpack.HotModuleReplacementPlugin()
    //]
});
module.exports = config;
