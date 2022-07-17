import React, { useState } from 'react';
import './signIn.styles.scss';
import Logo from '../../logo.svg';
import CustomInput from '../../components/customInput/customInput.component';
import CustomButton from '../../components/customButton/customButton.component';
// Redux
import { connect } from 'react-redux';
import { setUid, setLoggedIn } from '../../redux/user/user.actions';
// Firebase
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.utils';

const SignIn = ({ setUid, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // On Input Change Handler
  const onInputChange = (event) => {
    const { value, name } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // On Button Click
  const signInButtonClick = async () => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setUid(userCredential.user.uid);
        setLoading(false);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="signInContainer container-fluid pt-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <img className="logo" src={Logo} alt="" />
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-12 col-md-6 inputHolder">
          <label htmlFor="email">Email</label>
          <CustomInput
            id="email"
            type="email"
            name="email"
            placeholder="example@email.com"
            value={email}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-3">
        <div className="col-12 col-md-6 inputHolder">
          <label htmlFor="password">Password</label>
          <CustomInput
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-4">
        <div className="col-8 col-md-3">
          <CustomButton
            loading={loading}
            text={'Sign In'}
            handleClick={() => signInButtonClick()}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setUid: (uid) => dispatch(setUid(uid)),
  setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn)),
});

export default connect(null, mapDispatchToProps)(SignIn);
