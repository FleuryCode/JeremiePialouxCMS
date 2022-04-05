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
import { db, storage } from "../../firebase/firebase.utils";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import IndividualImage from "../individualImage/individualImage.component";
import { deleteObject, ref } from "firebase/storage";


const SortablePhoto = SortableElement(item => <PortfolioImage {...item} />);
export const SortableGallery = SortableContainer(({ items }) => (
    <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

const HomeSection = ({ data, addedImages, isDownloading, setPortfolioData }) => {
    const [items, setItems] = useState({});
    const [changed, setChanged] = useState(false);
    // Add Save Changes for Spinner
    const [activeIndex, setActiveIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

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

    // Delete Button Click Not sure this is going to work.
    const handleDelete = async (data, index) => {
        const imageRef = ref(storage, `Portfolio/${data[index].imageName}`);
        setDeleting(true);

        await deleteDoc(doc(db, 'Portfolio', `${data[index].imageName}`));
        deleteObject(imageRef)
            .then(async () => {
                console.log('Image Deleted')
                data.splice(index, 1);
                await setPortfolioData(data);
                setActiveIndex(0);
                setDeleting(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                <IndividualImage data={data} index={activeIndex} deleteClick={handleDelete} isDeleting={deleting} />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    data: state.portfolio.portfolioData,
    isDownloading: state.portfolio.isDownloading,
    addedImages: state.portfolio.addedImages
});

const mapDispatchToProps = (dispatch) => ({
    setPortfolioData: data => dispatch(setPortfolioData(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeSection);