import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import SignIn from './pages/signin/signIn.page';
import Homepage from './pages/homepage/homePage.page';
// Redux
import { connect } from 'react-redux';
import { setPortfolioDb } from './redux/portfolio/portfolio.actions';
// Firebase
import firebaseApp, { db } from './firebase/firebase.utils';
import { doc, onSnapshot } from "firebase/firestore";



function App({ loggedIn, setPortfolioDb }) {

  const dataArray = onSnapshot(doc(db, 'Portfolio', 'MainPortfolio'), (doc) => {
    const data = doc.data().images;
    // Organizing based on ID.
    data.sort((a, b) => {
      return a.id - b.id;
    });
    let imageNameArray = [];
    data.forEach((image) => {
      imageNameArray.push(image.imageName);
    });

    setPortfolioDb(imageNameArray);
  });

  useEffect(() => {
    dataArray();
  });

  const devVar = true;

  return (
    <div className="App">
      {devVar ? <Homepage /> : <SignIn />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
  setPortfolioDb: portfolioData => dispatch(setPortfolioDb(portfolioData))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
