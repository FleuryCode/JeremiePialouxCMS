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
import IndividualImage from "../individualImage/individualImage.component";

// Turn these into components.

const SortablePhoto = SortableElement(item => <PortfolioImage {...item} />);
export const SortableGallery = SortableContainer(({ items }) => (
    <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

const HomeSection = ({ data, images, isDownloading }) => {
    const [items, setItems] = useState({});
    const [changed, setChanged] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let fullData = data;
        for (let j = 0; j < images.length; j++) {
            fullData[j].src = images[j];
        };
        setItems(fullData);
    }, [images]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
        setChanged(true);
    };

    const onSaveOrderClick = async () => {
        console.log('Data', data);
        console.log('Items', items);
        for (let i = 0; i < items.length; i++) {
            const docRef = doc(db, 'Portfolio', `${items[i].imageName}`);
            await updateDoc(docRef, {
                id: (i + 1),
                key: `${i + 1}`
            });

        }
        setChanged(false);
        console.log('Loop done?');
        // Works but clunky. It is getting the data right away. Make a redux variable to change and draw data.
    }

    const handleSelectorClick = (index, specificImage) => {
        setActiveIndex(index);
    };

    return (
        <div className="homeSectionContainer">
            <div className="buttonContainer">
                <AddImageButton />

            </div>
            <div className={`${isDownloading ? 'd-none' : 'd-flex'} portfolioContainer`}>
                <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
                <div onClick={onSaveOrderClick} className={`${(changed) ? 'd-flex' : 'd-none'} saveOrderButton`}>
                    Enregistrer
                </div>
            </div>
            <div className="individualImageSelectors">
                {
                    data.map((image, index) => (
                        <div onClick={() => handleSelectorClick(index, image)} key={image.id} className="imageSelector">
                            <img className={`${(activeIndex === index) ? 'active' : ''}`} src={image.src} alt={image.title} />
                        </div>
                    ))
                }
            </div>
            <div className="individualImageComponentContainer">
                <IndividualImage data={data} index={activeIndex} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    data: state.portfolio.portfolioData,
    images: state.portfolio.portfolioImages,
    isDownloading: state.portfolio.isDownloading
});


export default connect(mapStateToProps)(HomeSection);