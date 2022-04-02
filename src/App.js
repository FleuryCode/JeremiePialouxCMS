import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import SignIn from './pages/signin/signIn.page';
import Homepage from './pages/homepage/homePage.page';
// Redux
import { connect } from 'react-redux';
import { setPortfolioData, setImagesDownloading, setPortfolioImages } from './redux/portfolio/portfolio.actions';
// Firebase
import firebaseApp, { db, storage } from './firebase/firebase.utils';
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref } from 'firebase/storage';



function App({ loggedIn, setPortfolioData, setImagesDownloading, setPortfolioImages }) {

  const getImageUrls = async (data) => {
    let imageUrls = [];
    for (let i = 0; i < data.length; i++) {
      await getDownloadURL(ref(storage, `Portfolio/${data[i].imageName}`))
        .then((url) => {
          imageUrls.push(url);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    for (let j = 0; j < imageUrls.length; j++) {
      data[j].src = imageUrls[j];
    
    }

    setPortfolioData(data);
    setPortfolioImages(imageUrls);
    setImagesDownloading(false);
  };

  // const dataArray = onSnapshot(doc(db, 'Portfolio', 'MainPortfolio'), (doc) => {
  //   const data = doc.data();
  //   // Organizing based on ID.
  //   data.images.sort((a, b) => {
  //     return a.id - b.id;
  //   });
  //   getImageUrls(data, data.images);
  // });

  const q = query(collection(db, 'Portfolio'));
  const portfolioDocuments = onSnapshot(q, (querySnapshot) => {
    const portfolioDocs = [];
    querySnapshot.forEach((doc) => {
      portfolioDocs.push(doc.data());
    });
    portfolioDocs.sort((a, b) => {
      return a.id - b.id;
    });
    getImageUrls(portfolioDocs);
  });

  useEffect(() => {
    portfolioDocuments();
  }, []);

  const devVar = true;

  return (
    <div className="App">
      {devVar ? <Homepage /> : <SignIn />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  setPortfolioData: data => dispatch(setPortfolioData(data)),
  setImagesDownloading: isDownloading => dispatch(setImagesDownloading(isDownloading)),
  setPortfolioImages: imageArray => dispatch(setPortfolioImages(imageArray))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
