import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {AppRoot} from "./components/AppRoot";

const message: string = "this is the client";
console.log(message);

ReactDOM.render(<AppRoot/>, document.getElementById('root'));
