import * as React from 'react';
import * as ReactDOM from 'react-dom'
import * as defs from './definitions/definitions';
import { AppRoot } from "./components/AppRoot";
import createBrowserHistory from "history/createBrowserHistory";
import { rootReducer } from "./reducers/reducer";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from 'react-redux';
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";

//polyfills for IE
require('./util/polyfills');

const message: string = "this is the client";
console.log(message);

const history = createBrowserHistory();

//configure store based on https://github.com/supasate/connected-react-router
const store = createStore(
    connectRouter(history)(rootReducer),
    compose(
        applyMiddleware(
            routerMiddleware(history)
        )
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppRoot/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
