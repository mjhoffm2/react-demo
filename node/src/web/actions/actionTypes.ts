import * as defs from '../definitions/definitions';

export enum ActionTypes {
    LOAD_CHANNELS = "LOAD_CHANNELS"
}

export type Action = loadChannelsAction;

export interface loadChannelsAction {
    type: ActionTypes.LOAD_CHANNELS;
    channels: defs.Channel[];
}
