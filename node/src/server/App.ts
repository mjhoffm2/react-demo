import * as express from "express";
import * as path from "path";
import * as webpack from 'webpack';
import * as devMiddleware from 'webpack-dev-middleware';
import * as hotMiddleware from 'webpack-hot-middleware';
import {Configuration} from "webpack";

const configs: Configuration[] = require('../../webpack.config');
const config = configs.find(config => config.name === "web");

export class App {
    // ref to Express instance
    public express: express.Application;
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();

        this.configureMiddleWare();

        //configure endpoints that are handled by api calls
        this.configureApi();

        //static files
        this.express.use(express.static(path.join(__dirname, '../../public')));

        //serve static home page for all remaining requests
        this.express.get("*", (req, res, next) => {
            let filePath: string = path.resolve(__dirname, '../../public/main.html');
            res.sendFile(filePath);
        });
    }

    // Configure Express middleware.
    private configureMiddleWare(): void {

        if(process.env.NODE_ENV === 'development') {

            const compiler = webpack({
                ...config,
                mode: "development",
            });

            //enable hot module replacement part 1
            this.express.use(devMiddleware(compiler, {
                publicPath: config!.output!.publicPath!
            }));

            //enable hot module replacement part 1
            this.express.use(hotMiddleware(compiler));
        }
    }

    // Configure API endpoints.
    private configureApi(): void {

    }
}
