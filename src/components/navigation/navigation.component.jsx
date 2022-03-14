import React from "react";
import './navigation.styles.scss';
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as HomeIcon } from '../../assets/homeIcon.svg';
import { ReactComponent as EditTextIcon } from '../../assets/editTextIcon.svg';

const Navigation = () => {
    let location = useLocation();
    return (
        <div className="navigationContainer">
            <Link className="iconContainer" to={'/'} >
                <HomeIcon className="icon" fill={`${(location.pathname === '/') ? '#676767' : '#ffffff' }`} />
            </Link>
            <Link className="iconContainer" to={'/modification'} >
                <EditTextIcon className="icon" fill={`${(location.pathname === '/modification') ? '#676767' : '#ffffff' }`} />
            </Link>
        </div>
    );
}

export default Navigation;