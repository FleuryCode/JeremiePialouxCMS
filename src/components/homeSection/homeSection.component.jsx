import React from "react";
import './homeSection.styles.scss';

// Redux
import { connect } from "react-redux";
import PortfolioImage from "../portfolioImage/portfolioImage.component";

const HomeSection = ({ images }) => {
    const testImage = images[0];
    return (
        <div className="homeSectionContainer">
            <div className="portfolioContainer">
                <PortfolioImage image={testImage} />
                <PortfolioImage image={testImage} />
                <PortfolioImage image={testImage} />
                <PortfolioImage image={testImage} />
                <PortfolioImage image={testImage} />
                <PortfolioImage image={testImage} />
                <PortfolioImage image={testImage} />
                <PortfolioImage image={testImage} />
                <PortfolioImage image={testImage} />
                <PortfolioImage image={testImage} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    images: state.portfolio.portfolioImages
});

export default connect(mapStateToProps)(HomeSection);