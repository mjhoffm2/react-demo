const path = require('path');
const nodeExternals = require('webpack-node-externals');

var config = [
    //web configuration
    {
        entry: ['./src/web/index.tsx'],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'public/bundle.js',
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
                    loader: "awesome-typescript-loader",
                    options: {
                        configFile: path.resolve(__dirname, "./tsconfig.web.json")
                    }
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|ttf|otf)$/,
                    loader: 'url-loader?limit=25000'
                },
            ]
        },
        mode: 'development',
        devtool: "source-map"
    },

    //server configuration
    {
        entry: ['./src/server/main.ts'],
        target: 'node',
        externals: [nodeExternals()],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'server/[name].js',
        },
        module: {
            rules: [
                {
                    test:/\.tsx?$/,
                    include: path.resolve(__dirname, "./src/server/"),
                    loader: "awesome-typescript-loader",
                    options: {
                        configFile: path.resolve(__dirname, "./tsconfig.server.json")
                    }
                }
            ]
        },
        mode: 'development',

        //by default, webpack will set these to '/', so override that behavior on the server
        node: {
            __dirname: false,
            __filename: false
        }
    }
]
module.exports = config;