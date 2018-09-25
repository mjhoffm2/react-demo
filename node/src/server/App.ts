import * as express from "express";
import * as path from "path";

export class App {
    // ref to Express instance
    public express: express.Application;
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.configureMiddleWare();
        this.configureApi();

        //static files
        this.express.use(express.static(path.join(__dirname, '/../public')));

        //temporary static home page
        this.express.get("/", (req, res, next) => {
            let filePath: string = path.resolve(__dirname, '../public/main.html');
            res.sendFile(filePath);
        });
    }

    // Configure Express middleware.
    private configureMiddleWare(): void {

    }

    // Configure API endpoints.
    private configureApi(): void {

    }
}
