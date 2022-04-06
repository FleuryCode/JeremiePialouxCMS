import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import portfolioReducer from "./portfolio/portfolio.reducer";
import textReducer from "./text/text.reducer";

export default combineReducers ({
    user: userReducer,
    portfolio: portfolioReducer,
    text: textReducer
});