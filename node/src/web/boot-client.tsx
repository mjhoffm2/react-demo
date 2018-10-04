import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {rootReducer} from "./reducers/reducer";
import {createStore} from "redux";
import {Provider} from 'react-redux';
import {AppRoot} from "./components/AppRoot";

//polyfills for IE
import './util/polyfills';
import 'es6-promise/auto';

const message: string = "this is the client";
console.log(message);

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
            <AppRoot/>
    </Provider>,
    document.getElementById('root')
);
