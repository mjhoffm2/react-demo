import * as React from 'react';
import {Route, Switch, Redirect, RouteComponentProps} from 'react-router';
import { AppRoot } from "./components/AppRoot";
import {ChannelList} from "./components/Channels";

export const routes = (props: RouteComponentProps<{}>) => <switch>
    <Route exact path={'/'} component={AppRoot} />
    <Route path={'/channels'} component={ChannelList} />
    <Redirect to={'/'}/>
</switch>;