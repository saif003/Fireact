import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDsxy1_Vgl70CPpvA9TuA1iiMmlw5fMtu8",
  authDomain: "fir-app-d76e1.firebaseapp.com",
  databaseURL: "https://fir-app-d76e1.firebaseio.com",
  projectId: "fir-app-d76e1",
  storageBucket: "fir-app-d76e1.appspot.com",
  messagingSenderId: "154719325353",
  appId: "1:154719325353:web:fcad2fae928807965f6db8",
  measurementId: "G-K5T8LCWVC8",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
