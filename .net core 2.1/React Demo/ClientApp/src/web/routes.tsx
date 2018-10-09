import * as React from 'react';
import {Route, Switch, Redirect} from 'react-router';
import { hot } from 'react-hot-loader'
import {ChannelList} from "./components/Channels";
import {Home} from "./components/Home";

export const Routes = hot(module)(() =>
    <Switch>
        <Route exact path={'/'} component={Home} />
        <Route path={'/channels'} component={ChannelList} />
        <Redirect to={'/'}/>
    </Switch>
);

