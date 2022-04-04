import React, { useEffect, useState } from "react";
import './homeSection.styles.scss';
import PortfolioImage from "../portfolioImage/portfolioImage.component";
import AddImageButton from "../addImageButton/addImageButton.component";
// Redux
import { connect } from "react-redux";
import { setPortfolioData } from "../../redux/portfolio/portfolio.actions";
// Sorting
import Gallery from "react-photo-gallery";
import { arrayMoveImmutable } from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
// Firebase
import { db } from "../../firebase/firebase.utils";
import { doc, updateDoc } from "firebase/firestore";
import IndividualImage from "../individualImage/individualImage.component";


const SortablePhoto = SortableElement(item => <PortfolioImage {...item} />);
export const SortableGallery = SortableContainer(({ items }) => (
    <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

const HomeSection = ({ data, images, isDownloading, setPortfolioData }) => {
    const [items, setItems] = useState({});
    const [changed, setChanged] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setItems(data);
    }, [data]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
        setChanged(true);
    };

    const onSaveOrderClick = async () => {
        for (let i = 0; i < items.length; i++) {
            items[i].id = (i + 1);
            items[i].key = `${i + 1}`;
            const docRef = doc(db, 'Portfolio', `${items[i].imageName}`);
            await updateDoc(docRef, {
                id: (i + 1),
                key: `${i + 1}`
            });
        }
        
        setPortfolioData(items);
        setChanged(false);

    }

    const handleSelectorClick = (index) => {
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

const mapDispatchToProps = (dispatch) => ({
    setPortfolioData: data => dispatch(setPortfolioData(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeSection);