import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import SignIn from './pages/signin/signIn.page';
import Homepage from './pages/homepage/homePage.page';
// Redux
import { connect } from 'react-redux';
import { setPortfolioData } from './redux/portfolio/portfolio.actions';
// Firebase
import firebaseApp, { db } from './firebase/firebase.utils';
import { doc, onSnapshot } from "firebase/firestore";



function App({ loggedIn, setPortfolioData }) {

  const dataArray = onSnapshot(doc(db, 'Portfolio', 'MainPortfolio'), (doc) => {
    const data = doc.data().images;
    // Organizing based on ID.
    data.sort((a, b) => {
      return a.id - b.id;
    });
    setPortfolioData(data);
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
  setPortfolioData: data => dispatch(setPortfolioData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
