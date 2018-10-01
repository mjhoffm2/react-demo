import * as React from 'react';
import * as defs from '../definitions/definitions';
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { Action } from "../actions/actionTypes";
import { push } from "connected-react-router";
import {connect} from "react-redux";

interface urlParams {
    channelId: string;
}

interface params extends RouteComponentProps<urlParams> {}

interface connectedState {
    channel: defs.Channel | null;
}

interface connectedDispatch {
    push: (url: string) => void;
}

const mapStateToProps = (state: defs.State, ownProps: params): connectedState => {
    if(state.channels) {
        const channelId = parseInt(ownProps.match.params.channelId);
        const channel = state.channels.find(channel => channel.channelId === channelId);

        if(channel) {
            return {
                channel
            };
        }
    }

    return {
        channel: null
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): connectedDispatch => ({
    push: url => dispatch(push(url))
});

type fullParams = params & connectedState & connectedDispatch;

interface localState {}

class ViewChannelComponent extends React.Component<fullParams, localState> {
    render() {
        return (
            <div>
                <div>Channel Id: {this.props.match.params.channelId}</div>
                {
                    this.props.channel ?
                        <div>Channel Name: {this.props.channel.displayName}</div> :
                        <div>Loading...</div>
                }
                <a
                    href='#'
                    onClick={e => {
                        e.preventDefault();
                        this.props.push('/channels');
                    }}
                >
                    Close
                </a>
            </div>
        );
    }
}

export const ViewChannel: React.ComponentClass<params> =
    connect(mapStateToProps, mapDispatchToProps)(ViewChannelComponent);
