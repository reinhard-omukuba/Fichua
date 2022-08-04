const firebaseConfig = {
    apiKey: "AIzaSyDmixVbAMHCHMV515mPBvTnRoJlu42p8iU",
    authDomain: "mzalendo-a4b5b.firebaseapp.com",
    projectId: "mzalendo-a4b5b",
    storageBucket: "mzalendo-a4b5b.appspot.com",
    messagingSenderId: "1017240434521",
    appId: "1:1017240434521:web:a096c92d44924eda9b3e48",
    measurementId: "G-0ES0675RZH"
};

firebase.initializeApp(firebaseConfig);


//access data offline
// firebase.firestore().enablePersistence()
// .catch((err) => {
//     if (err.code == 'failed-precondition') {
//         // Multiple tabs open, persistence can only be enabled
//         // in one tab at a a time.
//         // ...
//     } else if (err.code == 'unimplemented') {
//         // The current browser does not support all of the
//         // features required to enable persistence
//         // ...
//     }
// });