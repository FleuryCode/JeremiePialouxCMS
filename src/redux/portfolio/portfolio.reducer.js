import { PortfolioTypes } from "./portfolio.types";

const INITIAL_STATE = {
    portfolioData: [],
    portfolioImages: [],
    isDownloading: true,
    addedImages: 0
};

const portfolioReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PortfolioTypes.SET_PORTFOLIO_DATA:
            return {
                ...state,
                portfolioData: action.payload
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
        case PortfolioTypes.SET_ADDED_IMAGES:
            return {
                ...state,
                addedImages: action.payload
            };
        default:
            return state;
    };
};

export default portfolioReducer;