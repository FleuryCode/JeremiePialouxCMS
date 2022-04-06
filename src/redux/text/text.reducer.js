import { TextTypes } from "./text.types";

const INITIAL_STATE = {
    aboutText: 'Fill this out',
    homeText: 'Fill this out too'
};

const textReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TextTypes.SET_ABOUT_TEXT:
            return {
                ...state,
                aboutText: action.payload
            };
        case TextTypes.SET_HOME_TEXT:
            return {
                ...state,
                homeText: action.payload
            };
        default:
            return state;
    }
}

export default textReducer;