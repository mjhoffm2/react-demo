import * as defs from '../definitions/definitions';
import {Action, ActionTypes} from "../actions/actionTypes";
import {combineReducers, Reducer} from "redux";

export const initialChannelState: defs.State['channels'] = null;

export const channelReducer: Reducer<defs.State['channels']> = (state = initialChannelState, action) => {
    switch(action.type) {
        case ActionTypes.LOAD_CHANNELS: {
            return action.channels;
        }
    }
    return state;
};

export const rootReducer = combineReducers({
    channels: channelReducer
});