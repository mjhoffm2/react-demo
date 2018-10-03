const path = require('path');
const nodeExternals = require('webpack-node-externals');

var config = [
    //web configuration
    {
        entry: ['./src/web/boot-client.tsx'],
        output: {
            path: path.resolve(__dirname, './public'),
            filename: 'build/bundle.js',
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
                    include: path.resolve(__dirname, "./src/web/"),
                    loader: "awesome-typescript-loader"
                }
            ]
        },
        devtool: "source-map"
    },

    //server configuration
    {
        entry: ['./src/server/main.ts'],
        target: 'node',

        //make sure that webpack doesn't waste time compiling and bundling code that is already available in node
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
            __dirname: false,
            __filename: false
        }
    }
];
module.exports = config;