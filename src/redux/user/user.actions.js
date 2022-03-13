import { UserTypes } from "./user.types";

export const setUid = (uid) => ({
    type: UserTypes.SET_UID,
    payload: uid
});

export const setLoggedIn = (loggedIn) => ({
    type: UserTypes.SET_LOGGED_IN,
    payload: loggedIn
});