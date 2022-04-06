import { TextTypes } from "./text.types";

export const setAboutText = (aboutText) => ({
    type: TextTypes.SET_ABOUT_TEXT,
    payload: aboutText
});

export const setHomeText = (homeText) => ({
    type: TextTypes.SET_HOME_TEXT,
    payload: homeText
});