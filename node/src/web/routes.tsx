import * as React from 'react';
import {Route, Switch, Redirect} from 'react-router';
import {ChannelList} from "./components/Channels";
import {Home} from "./components/Home";

export const Routes = () =>
    <Switch>
        <Route exact path={'/'} component={Home} />
        <Route path={'/channels'} component={ChannelList} />
        <Redirect to={'/'}/>
    </Switch>;
