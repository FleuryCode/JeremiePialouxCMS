import React from "react";
import './homeSection.styles.scss';
import PortfolioImage from "../portfolioImage/portfolioImage.component";
import AddImageButton from "../addImageButton/addImageButton.component";

// Redux
import { connect } from "react-redux";

const HomeSection = ({ images }) => {
    return (
        <div className="homeSectionContainer">
            <div className="portfolioContainer">
                {
                    images.map(image => (
                        <PortfolioImage key={image} image={image} />
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
    images: state.portfolio.portfolioImages
});

export default connect(mapStateToProps)(HomeSection);