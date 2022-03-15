import React from "react";
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

    const addButtonClick = () => {
        hiddenFileInput.current.click();
    };

    const multiUploadChange = async (event) => {
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
                                imageName: fileArray[i].name
                            }
                        );
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            }
            // Waits until loop is done
            console.log('Loop is complate', portfolioData);
            const portfolioRef = doc(db, 'Portfolio', 'MainPortfolio');
            await updateDoc(portfolioRef, portfolioData);
            console.log('Huzzah!');
            // Look into adding another redux isUploading/Downloading field to add empty loading boxes. More UX friendly.
        }
    }
    return (
        <div className="addImageButtonContainer">
            <div onClick={addButtonClick} className="addButton">
                <img src={PlusIcon} alt="Add image button" />
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