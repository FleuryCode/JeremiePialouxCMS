import React from "react";
import './homeSection.styles.scss';
import PortfolioImage from "../portfolioImage/portfolioImage.component";
import AddImageButton from "../addImageButton/addImageButton.component";

// Redux
import { connect } from "react-redux";

const HomeSection = ({ images, data }) => {
    
    let allImageData = data;
    if (images.length === data.length) {
        for (let i = 0; i < data.length; i++) {
            allImageData[i].heroUrl = images[i];
        }
    }
    

    return (
        <div className="homeSectionContainer">
            <div className="portfolioContainer">
                {
                    allImageData.map(data => (
                        <PortfolioImage key={data.id} image={data.heroUrl} />
                    ))
                }
            </div>
            <div className="buttonContainer">
                <AddImageButton />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    images: state.portfolio.portfolioImages,
    data: state.portfolio.portfolioData
});

export default connect(mapStateToProps)(HomeSection);