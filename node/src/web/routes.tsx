import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { AppRoot } from "./components/AppRoot";
import { ChannelList } from "./components/Channels";

export const Routes = () => <Switch>
    <Route exact path={'/'} component={AppRoot} />
    <Route path={'/channels'} component={ChannelList} />
    <Redirect to={'/'}/>
</Switch>;