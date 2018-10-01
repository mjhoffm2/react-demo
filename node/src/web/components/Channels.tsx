import * as React from 'react';
import * as defs from '../definitions/definitions';
import {Route, RouteComponentProps, Switch} from "react-router";
import { Dispatch } from "redux";
import { Action } from "../actions/actionTypes";
import { push } from "connected-react-router";
import {connect} from "react-redux";
import {ViewChannel} from "./ViewChannel";

interface urlParams {
    channelId: string;
}

interface params extends RouteComponentProps<urlParams> {}

interface connectedState {
    channels: defs.Channel[] | null;
}

interface connectedDispatch {
    push: (url: string) => void;
}

const mapStateToProps = (state: defs.State): connectedState => ({
    channels: state.channels
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): connectedDispatch => ({
    push: url => dispatch(push(url))
});

type fullParams = params & connectedState & connectedDispatch;

interface localState {}

class ChannelListComponent extends React.Component<fullParams, localState> {
    render() {
        return (
            <div>
                <div>
                    {
                        this.props.channels ?
                            this.props.channels.map(channel =>
                                <div key={channel.channelId}>
                                    {channel.displayName}
                                    <a
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.push(`${this.props.match.url}/${channel.channelId}/view`)
                                        }}
                                    >
                                        Open
                                    </a>
                                </div>
                            ) :
                            "Loading..."
                    }
                </div>
                <Switch>
                    <Route path={`${this.props.match.url}/:channelId/view`} component={ViewChannel}/>
                    <Route
                        render={() =>
                            <div>Please select a Channel</div>
                        }
                    />
                </Switch>
                <a
                    href='#'
                    onClick={e => {
                        e.preventDefault();
                        this.props.push('/');
                    }}
                >
                    Return to home
                </a>
            </div>
        );
    }
}

export const ChannelList: React.ComponentClass<params> =
    connect(mapStateToProps, mapDispatchToProps)(ChannelListComponent);
