import React from "react";
import './portfolioImage.styles.scss';

const PortfolioImage = ({ photo }) => {
    const nodeRef = React.useRef(null);
    return (
        <div ref={nodeRef} key={photo.id} className="portfolioImageContainer" draggable="draggable">
            <img src={photo.src} alt="" />
        </div>
    );
}

export default PortfolioImage;