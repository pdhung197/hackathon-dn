import * as firebase from 'firebase'

// import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/performance';

export const config = {
    apiKey: 'AIzaSyCmmiyeaqjo86zIwvy0TdFFaNwlmEYkn3o',
    authDomain: 'busshuttle-48ae5.firebaseapp.com',
    databaseURL: 'https://busshuttle-48ae5.firebaseio.com',
    projectId: 'busshuttle-48ae5',
    storageBucket: 'busshuttle-48ae5.appspot.com',
    messagingSenderId: '714080369658',
    appId: '1:714080369658:web:afe9fbc951b615044a4243',
    measurementId: 'G-022VWE51NY',
}

firebase.initializeApp(config)

export default firebase
// export const analytics = firebase.analytics();
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
// export const storage = firebase.storage();
// export const performance = firebase.performance();
