import React, { useEffect, useState } from "react";
import './homeSection.styles.scss';
import PortfolioImage from "../portfolioImage/portfolioImage.component";
import AddImageButton from "../addImageButton/addImageButton.component";
// Redux
import { connect } from "react-redux";
// Sorting
import Gallery from "react-photo-gallery";
import { arrayMoveImmutable } from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
// Firebase
import { db } from "../../firebase/firebase.utils";
import { doc, updateDoc } from "firebase/firestore";

// Turn these into components.
const SortablePhoto = SortableElement(item => <PortfolioImage {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
    <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

const HomeSection = ({ data }) => {
    console.log(data);
    
    const [items, setItems] = useState(data.images);
    const [changed, setChanged] = useState(false);
    data.images = items;

    useEffect(() => {
        setChanged(false);
        console.log('Hey')
    }, [data]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
        setChanged(true);
    };

    const onSaveOrderClick = () => {
        const portfolioRef = doc(db, 'Portfolio', 'MainPortfolio');
        for (let i = 0; i < items.length; i++) {
            
            data.images[i].id = i + 1    
        }        
        updateDoc(portfolioRef, data);
        setChanged(false);
    }

    const testClick = () => {
        console.log(data);
    }


    return (
        <div className="homeSectionContainer">
            <div className="imagesAndButtonsContainer">
                <div className="portfolioContainer">
                    <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
                </div>
                <div className="buttonContainer">
                    <AddImageButton onClick={testClick} />
                    <div onClick={onSaveOrderClick} className={`${(changed) ? 'd-flex' : 'd-none'} saveOrderButton`}>
                        Enregistrer
                    </div>
                </div>
            </div>

            <div className="testContainer">
                <button onClick={testClick}>Test</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    data: state.portfolio.portfolioData,
    // Add is uploading. Try it out.
});


export default connect(mapStateToProps)(HomeSection);