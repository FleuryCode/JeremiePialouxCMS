import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import portfolioReducer from "./portfolio/portfolio.reducer";

export default combineReducers ({
    user: userReducer,
    portfolio: portfolioReducer
});