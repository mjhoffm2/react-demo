import * as express from "express";
import * as path from "path";
import * as webpack from 'webpack';
import * as devMiddleware from 'webpack-dev-middleware';
import * as hotMiddleware from 'webpack-hot-middleware';
import {Configuration} from "webpack";

const configs: (env: any, options: any) => Configuration[] = require('../../webpack.config');
const config = configs({}, {mode: "development"}).find(config => config.name === "web");

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
            if(req.path.lastIndexOf('.') > req.path.lastIndexOf('/')) {
                //if this request looks like a static file, ignore it
                return next();
            }

            let filePath: string;

            if(process.env.NODE_ENV === 'development') {
                filePath = path.resolve(__dirname, '../devmain.html');
            } else {
                filePath = path.resolve(__dirname, '../../public/build/main.html');
            }
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
            //const compiler = webpack(configs);

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
