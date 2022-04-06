import { TextTypes } from "./text.types";

const INITIAL_STATE = {
    textData: [
        
    ]
};

const textReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TextTypes.SET_TEXT_DATA:
            return {
                ...state,
                textData: action.payload
            };
        default:
            return state;
    }
}

export default textReducer;