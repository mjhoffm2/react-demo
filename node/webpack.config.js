const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

var config = (env, options) => [
    //web configuration
    {
        name: 'web',
        entry: options.mode === 'production' ? [
            './src/web/boot-client.tsx'
        ] : [
            //we configure the hot reloader as a separate entry point to the application
            'webpack-hot-middleware/client',

            './src/web/boot-client.tsx'
        ],
        output: {
            path: path.resolve(__dirname, './public/build'),
            publicPath: '/build',
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
                    use: options.mode === 'production' ?
                        ['file-loader', 'css-loader?minimize'] :
                        ['style-loader', 'css-loader'],
                },
                {
                    test:/\.tsx?$/,
                    include: path.resolve(__dirname, "./src/web/"),
                    loader: "awesome-typescript-loader"
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|ttf|otf|woff|woff2|eot)$/,
                    loader: 'url-loader?limit=25000'
                }
            ]
        },

        //see https://webpack.js.org/configuration/devtool/ for options
        devtool: options.mode === 'production' ? "source-map" : "cheap-module-eval-source-map",

        plugins: options.mode === 'production' ? [] : [
            new webpack.HotModuleReplacementPlugin()
        ]
    },

    //server configuration
    {
        name: 'server',
        entry: ['./src/server/main.ts'],
        target: 'node',
        externals: [nodeExternals()],
        output: {
            path: path.resolve(__dirname, './build'),
            filename: '[name].js',
        },
        resolve: {
            //automatically infer '.ts' and '.tsx' when importing files
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test:/\.tsx?$/,
                    include: path.resolve(__dirname, "./src/server/"),
                    loader: "awesome-typescript-loader"
                }
            ]
        },

        //by default, webpack will set these to '/', so override that behavior on the server
        node: {
            //setting these to 'true' causes them to keep the same values relative to the source code
            //setting these to 'false' would cause them to have values relative to the output code
            __dirname: true,
            __filename: true
        }
    }
];
module.exports = config;