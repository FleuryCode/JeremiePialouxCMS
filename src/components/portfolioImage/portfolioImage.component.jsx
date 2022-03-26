import React from "react";
import './portfolioImage.styles.scss';

const PortfolioImage = ({ photo }) => {
    return (
        <div className="portfolioImageContainer" draggable="draggable">
            <img src={photo.heroUrl} alt="" />
        </div>
    );
}

export default PortfolioImage;