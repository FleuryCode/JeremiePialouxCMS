import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseApp from './firebase/firebase.utils';
import SignIn from './pages/signin/signIn.page';

function App() {
  return (
    <div className="App">
      <SignIn />
    </div>
  );
}

export default App;
