import * as React from 'react';
import * as ReactDOM from 'react-dom'
import createBrowserHistory from "history/createBrowserHistory";
import { rootReducer } from "./reducers/reducer";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from 'react-redux';
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import {Routes} from "./routes";

//polyfills for IE
import './util/polyfills';
import 'es6-promise/auto';

//styles
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from "react-router";

const message: string = "this is the client";
console.log(message);

const history = createBrowserHistory();

//configure store based on https://github.com/supasate/connected-react-router
//const store = createStore(
//    connectRouter(history)(rootReducer),
//    compose(
//        applyMiddleware(
//            routerMiddleware(history)
//        ),
//        (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f
//    )
//);

const store = createStore(rootReducer);

//ReactDOM.render(
//    <Provider store={store}>
//        <ConnectedRouter history={history}>
//            <Routes/>
//        </ConnectedRouter>
//    </Provider>,
//    document.getElementById('root')
//);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Routes/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
