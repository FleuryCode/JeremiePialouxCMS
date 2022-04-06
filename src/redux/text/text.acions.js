import { TextTypes } from "./text.types";

export const setTextData = (textData) => ({
    type: TextTypes.SET_TEXT_DATA,
    payload: textData
});