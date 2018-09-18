importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


firebase.initializeApp({
  'messagingSenderId': '32138512339'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => console.log(payload));
