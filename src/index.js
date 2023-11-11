import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './Strore/FirebaseContext';
import Context from './Strore/FirebaseContext';
import firebaseApp from './Firebase/config'; // Adjust the path
// import storage from './Firebase/config'

ReactDOM.render(

  <FirebaseContext.Provider value={{firebaseApp}}>
    <Context>
    <App />
    </Context>
  
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
