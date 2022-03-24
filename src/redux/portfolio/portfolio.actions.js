import { PortfolioTypes } from "./portfolio.types";

export const setPortfolioData = (data) => ({
    type: PortfolioTypes.SET_PORTFOLIO_DATA,
    payload: data
});

export const setPortfolioImages = (imageArray) => ({
    type: PortfolioTypes.SET_PORTFOLIO_IMAGES,
    payload: imageArray
});

export const setImagesDownloading = (isDownloading) => ({
    type: PortfolioTypes.SET_IS_DOWNLOADING,
    payload: isDownloading
});