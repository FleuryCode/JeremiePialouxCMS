import { UserTypes } from "./user.types";

const INITIAL_STATE = {
    uid: '',
    loggedIn: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UserTypes.SET_UID:
            return {
                ...state,
                uid: action.payload
            };
        case UserTypes.SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.payload
            };
        default:
            return state
    };
};

export default userReducer;