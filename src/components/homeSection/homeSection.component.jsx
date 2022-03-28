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
export const SortableGallery = SortableContainer(({ items }) => (
    <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

const HomeSection = ({ data, images }) => {
    const [items, setItems] = useState({});
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        let fullData = data;
        for (let j = 0; j < images.length; j++) {
            fullData.images[j].src = images[j];
        };
        setItems(fullData.images);
    }, [images]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
        setChanged(true);
    };

    const onSaveOrderClick = async () => {
        const portfolioRef = doc(db, 'Portfolio', 'MainPortfolio');
        let uploadData = data;
        uploadData.images = items;
       
        for (let i = 0; i < items.length; i++) {
            uploadData.images[i].id = (i + 1);
            uploadData.images[i].key = `${i + 1}`;
        }
        
        await updateDoc(portfolioRef, uploadData);
        console.log('Complete Change');
        setChanged(false)
    }

    const testClick = () => {
        console.log('Items', items);
        console.log('Data.images', data.images);
    }


    



    return (
        <div className="homeSectionContainer">
            <div className="imagesAndButtonsContainer">
                <div className="portfolioContainer">
                    <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />

                </div>
                <div className="buttonContainer">
                    <AddImageButton />
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
    images: state.portfolio.portfolioImages
    // Add is uploading. Try it out.
});


export default connect(mapStateToProps)(HomeSection);