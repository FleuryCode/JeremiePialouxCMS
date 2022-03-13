import React from "react";
import './customButton.styles.scss';

const CustomButton = ({ handleClick, text, loading }) => {
    return (
        <div onClick={handleClick} className="customButtonContainer">
            {
                loading ?
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <h5>{text}</h5>
            }

        </div>
    );
}

export default CustomButton;