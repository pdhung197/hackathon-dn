import * as firebase from 'firebase';

// import 'firebase/analytics';
// import 'firebase/auth';
import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/performance';

/* export const config = {
  apiKey: 'AIzaSyABTj2rt4-ExjUMCG1Mw2Y33nDclgx7FY8',
  authDomain: 'animaldirectory-2a54d.firebaseapp.com',
  projectId: 'animaldirectory-2a54d',
  storageBucket: 'animaldirectory-2a54d.appspot.com',
  messagingSenderId: '515380426910',
  appId: '1:515380426910:web:3a03232f64cb585b2b638f',
}; */

export const config = {
  apiKey: 'AIzaSyAc0WgCTCIRswnPVhL4QA1OAP5qrK50A1o',
  authDomain: 'animals-manager.firebaseapp.com',
  projectId: 'animals-manager',
  storageBucket: 'animals-manager.appspot.com',
  messagingSenderId: '126652389747',
  appId: '1:126652389747:web:5d3eb8740cffa9f37a0d06',
};

firebase.initializeApp(config);

export default firebase;
// export const analytics = firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const storage = firebase.storage();
// export const performance = firebase.performance();
