import React from "react";
import './portfolioImage.styles.scss';

const PortfolioImage = ({ image }) => {
    return (
        <div className="portfolioImageContainer" draggable="draggable">
            <img src={image} alt="" />
        </div>
    );
}

export default PortfolioImage;