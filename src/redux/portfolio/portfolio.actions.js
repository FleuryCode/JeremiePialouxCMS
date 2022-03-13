import { PortfolioTypes } from "./portfolio.types";

export const setPortfolioDb = (dbArray) => ({
    type: PortfolioTypes.SET_PORTFOLIO_DB,
    payload: dbArray
});

export const setPortfolioImages = (imageArray) => ({
    type: PortfolioTypes.SET_PORTFOLIO_IMAGES,
    payload: imageArray
});

export const setImagesDownloading = (isDownloading) => ({
    type: PortfolioTypes.SET_IS_DOWNLOADING,
    payload: isDownloading
});