import * as express from 'express';
import * as path from 'path';
import * as http from 'http';

const message = "this is the server";
console.log(message);

console.log(`server env: ${process.env.NODE_ENV}`);

class App {
    // ref to Express instance
    public express: express.Application;
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.configureMiddleWare();
        this.configureApi();

        //static files
        this.express.use(express.static(path.join(__dirname, '/../../dist/public')));

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

const app = new App().express;
const port =  3000;
app.set('port', port);
//create a server and pass our Express app to it.
const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

//function to note that Express is listening
function onListening(): void {
    console.log(`Listening on port ${port}`);
}

export default app;
