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

const SortablePhoto = SortableElement(item => <PortfolioImage {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
    <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

const HomeSection = ({ data }) => {
    const [items, setItems] = useState(data);


    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
    };

    const testClick = () => {
        console.log(items);
    }


    return (
        <div className="homeSectionContainer">
            <div className="imagesAndButtonsContainer">
                <div className="portfolioContainer">
                    <SortableGallery items={items} onSortEnd={onSortEnd} axis={"xy"} />
                </div>
                <div className="buttonContainer">
                    <AddImageButton />
                </div>
            </div>

            <div className="testContainer">
                <button onClick={testClick}>Test</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    data: state.portfolio.portfolioData
});

export default connect(mapStateToProps)(HomeSection);