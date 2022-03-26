import React, { useEffect } from "react";
import './homePage.styles.scss';
import { Route, Routes } from "react-router-dom";
import Navigation from "../../components/navigation/navigation.component";
import HomeSection from "../../components/homeSection/homeSection.component";
import EditTextSection from '../../components/editTextSection/editTextSection.component';
// Redux
import { connect } from "react-redux";
import { setPortfolioImages, setImagesDownloading, setPortfolioData } from "../../redux/portfolio/portfolio.actions";
// Firebase
import { storage } from "../../firebase/firebase.utils";
import { getDownloadURL, ref } from "firebase/storage";


const Homepage = ({ setPortfolioImages, setImagesDownloading, setPortfolioData, isDownloading, portfolioData }) => {

    // Downloading Images From Storage
    const getImages = async () => {
        if (portfolioData.length > 0) {
            let imageUrls = [];
            for (let i = 0; i < portfolioData.length; i++) {
                await getDownloadURL(ref(storage, `Portfolio/${portfolioData[i].imageName}`))
                    .then((url) => {
                        imageUrls.push(url);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
            setPortfolioImages(imageUrls);
            setImagesDownloading(false);
            // This is where we should update data I believe.
            let allImageData = portfolioData;
            if (imageUrls.length === portfolioData.length) {
                for (let i = 0; i < portfolioData.length; i++) {
                    allImageData[i].heroUrl = imageUrls[i];
                }
                setPortfolioData(allImageData);
            }
        }
    };

    useEffect(() => {
        getImages();
    }, [portfolioData]);

    return (
        <div className="homepageContainer">
            {
                isDownloading ?
                    <div className="loadingLogo">
                        <h1>JP</h1>
                    </div>
                    :
                    <div className="sectionsContainer">
                        <Navigation />
                        <div className="servicesPagesContainer ms-auto">
                            <Routes>
                                <Route exact path="/" element={<HomeSection />} />
                                <Route exact path="/modification" element={<EditTextSection />} />
                            </Routes>
                        </div>
                    </div>

            }

        </div>
    );
}

const mapStateToProps = (state) => ({
    portfolioData: state.portfolio.portfolioData,
    isDownloading: state.portfolio.isDownloading
});

const mapDispatchToProps = (dispatch) => ({
    setPortfolioImages: images => dispatch(setPortfolioImages(images)),
    setImagesDownloading: isDownloading => dispatch(setImagesDownloading(isDownloading)),
    setPortfolioData: data => dispatch(setPortfolioData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);