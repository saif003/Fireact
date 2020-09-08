importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js');

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

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});
