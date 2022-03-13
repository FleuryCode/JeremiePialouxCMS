import React from "react";
import './signIn.styles.scss';
import Logo from '../../logo.svg';
import CustomInput from "../../components/customInput/customInput.component";

const SignIn = () => {
    return (
        <div className="signInContainer container-fluid">
            <div className="row my-5">
                <div className="col-12 d-flex justify-content-center">
                    <img className="logo" src={Logo} alt="" />
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-5">
                <div className="col-12 col-md-6 inputHolder">
                    <label htmlFor="email">Email</label>
                    <CustomInput type="email" name="email" placeholder="example@email.com" />
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-3">
                <div className="col-12 col-md-6 inputHolder">
                    <label htmlFor="password">Password</label>
                    <CustomInput type="password" name="password" placeholder="Password" />
                </div>
            </div>
        </div>
    );
}

export default SignIn;