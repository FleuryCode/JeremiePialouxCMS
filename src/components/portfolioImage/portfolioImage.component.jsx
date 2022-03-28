import React from "react";
import './portfolioImage.styles.scss';

const PortfolioImage = ({ photo }) => {

    return (
        <div key={photo.id} className="portfolioImageContainer" draggable="draggable">
            <img src={photo.src} alt="" />
        </div>
    );
}

export default PortfolioImage;