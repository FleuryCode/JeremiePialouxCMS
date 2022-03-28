import React, { useEffect } from "react";
import './homePage.styles.scss';
import { Route, Routes } from "react-router-dom";
import Navigation from "../../components/navigation/navigation.component";
import HomeSection from "../../components/homeSection/homeSection.component";
import EditTextSection from '../../components/editTextSection/editTextSection.component';
// Redux
import { connect } from "react-redux";

const Homepage = ({ isDownloading }) => {

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
    isDownloading: state.portfolio.isDownloading
});



export default connect(mapStateToProps)(Homepage);