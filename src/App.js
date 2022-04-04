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
import { collection, doc, getDocs, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref } from 'firebase/storage';



function App({ loggedIn, canDownload, setPortfolioData, setImagesDownloading, setPortfolioImages }) {

  const getData = async () => {
    let dataArray = [];
    const querySnapshot = await getDocs(collection(db, 'Portfolio'));
    querySnapshot.forEach((doc) => {
      dataArray.push(doc.data());
    });
    dataArray.sort((a, b) => {
      return a.id - b.id
    });

    for (let i = 0; i < dataArray.length; i++) {
      await getDownloadURL(ref(storage, `Portfolio/${dataArray[i].imageName}`))
        .then((url) => {
          dataArray[i].src = url;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // After Loop
    setPortfolioData(dataArray);
    setImagesDownloading(false);
  };

  useEffect(() => {
    getData();
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
  canDownload: state.portfolio.canDownload
});

const mapDispatchToProps = (dispatch) => ({
  setPortfolioData: data => dispatch(setPortfolioData(data)),
  setImagesDownloading: isDownloading => dispatch(setImagesDownloading(isDownloading)),
  setPortfolioImages: imageArray => dispatch(setPortfolioImages(imageArray))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
