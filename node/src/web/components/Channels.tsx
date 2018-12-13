import * as React from 'react';
import * as defs from '../definitions/definitions';
import {Dispatch} from "redux";
import {Action, ActionTypes} from "../actions/actionTypes";
import {connect} from "react-redux";

interface params {}

interface connectedState {
    channels: defs.Channel[] | null;
}

interface connectedDispatch {
    reloadChannels: () => Promise<void>;
}

const mapStateToProps = (state: defs.State): connectedState => {
    console.log("running mapStateToProps");

    return ({
        channels: state.channels
    });
};

const tempChannels: defs.Channel[] = [{
    channelId: 1,
    displayName: "General",
    canAnyoneInvite: true,
    isActiveDirectMessage: false,
    isGeneral: true,
    isPublic: true,
    ownerId: null
}, {
    channelId: 2,
    displayName: "Random",
    canAnyoneInvite: true,
    isActiveDirectMessage: false,
    isGeneral: false,
    isPublic: true,
    ownerId: 1
}, {
    channelId: 3,
    displayName: "Secret",
    canAnyoneInvite: false,
    isActiveDirectMessage: false,
    isGeneral: false,
    isPublic: false,
    ownerId: 1
}];

const mapDispatchToProps = (dispatch: Dispatch<Action>): connectedDispatch => ({
    reloadChannels: async () => {
        //TODO: load data from server

        console.log("dispatching load channels action");

        dispatch({
            //@ts-ignore
            type: "LOAD_CHANNELS",
            channels: tempChannels
        });
    }
});

type fullParams = params & connectedState & connectedDispatch;

class ChannelListComponent extends React.Component<fullParams> {

    componentDidMount() {
        this.props.reloadChannels();
        setTimeout(() => this.forceUpdate(), 500);
    }

    render() {
        return (
            <div>
                <div>
                    <h3>
                        Available Channels
                    </h3>
                </div>
                <div>
                    {
                        this.props.channels ?
                            this.props.channels.map(channel =>
                                <div key={channel.channelId}>
                                    {channel.displayName}
                                </div>
                            ) :
                            "Loading..."
                    }
                </div>
            </div>
        );
    }
}

export const ChannelList: React.ComponentClass<params> =
    connect(mapStateToProps, mapDispatchToProps)(ChannelListComponent);
