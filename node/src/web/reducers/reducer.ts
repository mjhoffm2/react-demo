import * as defs from '../definitions/definitions';
import {Action, ActionTypes} from "../actions/actionTypes";
import {combineReducers, Reducer} from "redux";

export const initialUserState: defs.State['users'] = null;

export const userReducer: Reducer<defs.State['users']> = (state = initialUserState, action) => {
    switch(action.type) {
        case ActionTypes.LOAD_USERS: {
            return action.users;
        }
    }
    return state;
};

export const initialChannelState: defs.State['channels'] = null;

export const channelReducer: Reducer<defs.State['channels']> = (state = initialChannelState, action) => {
    switch(action.type) {
        case ActionTypes.LOAD_CHANNELS: {
            return action.channels;
        }
    }
    return state;
};

type stateExceptRouter = defs.RemoveKeys<defs.State, 'router'>

//our root reducer ignores the 'router' state
//export const rootReducer = combineReducers<stateExceptRouter, Action>({
//    users: userReducer,
//    channels: channelReducer
//}) as Reducer<defs.State>;

const initialState = { users: null, channels: null };

export const rootReducer: Reducer<stateExceptRouter, Action> = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.LOAD_USERS: {
            return {
                ...state,
                users: action.users
            };
        }
        case ActionTypes.LOAD_CHANNELS: {
            return {
                ...state,
                channels: action.channels
            };
        }
    }
    return state;
};