import * as http from 'http';
import {App} from "./App";

console.log("this is the server");

console.log(`server env: ${process.env.NODE_ENV}`);

const app = new App().express;
const port =  3000;
app.set('port', 3000);
//create a server and pass our Express app to it.
const server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

//function to note that Express is listening
function onListening(): void {
    console.log(`Listening on port ${port}`);
}
