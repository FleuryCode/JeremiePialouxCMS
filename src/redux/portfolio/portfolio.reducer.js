import { PortfolioTypes } from "./portfolio.types";

const INITIAL_STATE = {
    portfolioData: [],
    portfolioDb: [],
    portfolioImages: [],
    isDownloading: true
};

const portfolioReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PortfolioTypes.SET_PORTFOLIO_DATA:
            return {
                ...state,
                portfolioData: action.payload
            };
        case PortfolioTypes.SET_PORTFOLIO_DB:
            return {
                ...state,
                portfolioDb: action.payload
            };
        case PortfolioTypes.SET_PORTFOLIO_IMAGES:
            return {
                ...state,
                portfolioImages: action.payload
            };
        case PortfolioTypes.SET_IS_DOWNLOADING:
            return {
                ...state,
                isDownloading: action.payload
            };
        default:
            return state;
    };
};

export default portfolioReducer;