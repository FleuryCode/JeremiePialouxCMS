import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import SignIn from './pages/signin/signIn.page';
import Homepage from './pages/homepage/homePage.page';
// Redux
import { connect } from 'react-redux';
import { setPortfolioData, setImagesDownloading } from './redux/portfolio/portfolio.actions';
import { setTextData } from './redux/text/text.acions';
// Firebase
import firebaseApp, { db, storage } from './firebase/firebase.utils';
import { collection, doc, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, ref } from 'firebase/storage';



function App({ loggedIn, setPortfolioData, setImagesDownloading, addedImages, setTextData }) {
  const [testData, setTestData] = useState(true);

  // Text Data
  const getTextData = async () => {
    const textDocRef = doc(db, 'Text', 'textData');
    const textDocSnap = await getDoc(textDocRef);

    if(textDocSnap.exists) {
      setTextData(textDocSnap.data());
    }else {
      console.log('Data does not exist.');
    };

  }

  // Portfolio Image Data
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
    console.log('Working');
  }, [addedImages]);

  useEffect(() => {
    getTextData();
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
  addedImages: state.portfolio.addedImages
});

const mapDispatchToProps = (dispatch) => ({
  setPortfolioData: data => dispatch(setPortfolioData(data)),
  setImagesDownloading: isDownloading => dispatch(setImagesDownloading(isDownloading)),
  setTextData: textData => dispatch(setTextData(textData))

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
