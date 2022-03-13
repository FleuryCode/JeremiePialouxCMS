import React, { useEffect } from "react";
import './homePage.styles.scss';
import { Route, Routes } from "react-router-dom";
import Navigation from "../../components/navigation/navigation.component";
// Redux
import { connect } from "react-redux";
import { setPortfolioImages, setImagesDownloading } from "../../redux/portfolio/portfolio.actions";
// Firebase
import { storage } from "../../firebase/firebase.utils";
import { getDownloadURL, ref } from "firebase/storage";


const Homepage = ({ portfolioDb, setPortfolioImages, setImagesDownloading, isDownloading }) => {

    // Downloading Images From Storage
    const getImages = async () => {
        if (portfolioDb.length > 0) {
            let imageUrls = [];
            for (let i = 0; i < portfolioDb.length; i++) {
                await getDownloadURL(ref(storage, `Portfolio/${portfolioDb[i]}`))
                    .then((url) => {
                        imageUrls.push(url);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
            setPortfolioImages(imageUrls);
            setImagesDownloading(false);
        };
    };

    useEffect(() => {
        getImages();
    }, [portfolioDb]);

    const testVar = true;
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

                            </Routes>
                        </div>
                    </div>

            }

        </div>
    );
}

const mapStateToProps = (state) => ({
    portfolioDb: state.portfolio.portfolioDb,
    isDownloading: state.portfolio.isDownloading
});

const mapDispatchToProps = (dispatch) => ({
    setPortfolioImages: images => dispatch(setPortfolioImages(images)),
    setImagesDownloading: isDownloading => dispatch(setImagesDownloading(isDownloading))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);