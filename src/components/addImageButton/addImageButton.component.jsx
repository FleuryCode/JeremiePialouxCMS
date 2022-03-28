import React, { useState } from "react";
import './addImageButton.styles.scss';
import PlusIcon from '../../assets/plusSignIcon.svg';
// Redux
import { connect } from "react-redux";
// Firebase
import { db, storage } from "../../firebase/firebase.utils";
import { ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const AddImageButton = ({ portfolioData }) => {
    const hiddenFileInput = React.useRef(null);
    const [imagesUploading, setImagesUploading] = useState(false);

    const addButtonClick = () => {
        hiddenFileInput.current.click();
    };

    const multiUploadChange = async (event) => {
        setImagesUploading(true);
        if (event.target.files && event.target.files[0]) {
            const fileArray = event.target.files;

            for (let i = 0; i < fileArray.length; i++) {
                const metadata = {
                    contentType: fileArray[i].type
                };

                const storageRef = ref(storage, `Portfolio/${fileArray[i].name}`);
                // Upload to Storage
                await uploadBytes(storageRef, fileArray[i], metadata)
                    .then((snapshot) => {
                        console.log('Storage Done')
                        portfolioData.images.push(
                            {
                                id: portfolioData.images.length + 1,
                                key: `${portfolioData.images.length + 1}`,
                                imageName: fileArray[i].name,
                                title: fileArray[i].name.replace(/\.[^/.]+$/, ""),
                                link: fileArray[i].name.replace(/\.[^/.]+$/, "").toLowerCase().replace(/ /g,''),
                                description: '',
                                otherImages: [fileArray[i].name],
                                height: 1,
                                width: 1,
                                src: ''
                            }
                        );
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
            // Waits until loop is done
            console.log('Loop is complete', portfolioData);
            const portfolioRef = doc(db, 'Portfolio', 'MainPortfolio');
            await updateDoc(portfolioRef, portfolioData);
            console.log('Huzzah!');
            setImagesUploading(false);
            // Look into adding another redux isUploading/Downloading field to add empty loading boxes. More UX friendly.
        }
    }
    return (
        <div className="addImageButtonContainer">
            <div onClick={addButtonClick} className="addButton">
                {
                    imagesUploading ?
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <img src={PlusIcon} alt="Add button" />
                }
                
            </div>
            <input
                onChange={multiUploadChange}
                id="addImages"
                type="file"
                accept="image/*"
                multiple="multiple"
                style={{ display: 'none' }}
                ref={hiddenFileInput} />

        </div>
    );
}

const mapStateToProps = (state) => ({
    portfolioData: state.portfolio.portfolioData
});

export default connect(mapStateToProps)(AddImageButton);