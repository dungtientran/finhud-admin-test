importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");
const firebaseConfig = {
    apiKey: "AIzaSyCh8ZSnw_Xc1fA1fnC-7gZq88Cu6ok-W0w",
    authDomain: "finhub-notification.firebaseapp.com",
    projectId: "finhub-notification",
    storageBucket: "finhub-notification.appspot.com",
    messagingSenderId: "24520901622",
    appId: "1:24520901622:web:200d279b5f5fe5c8fcfdd7",
    measurementId: "G-YV89S20E4L"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler((payload) => {
//     console.log(
//         "[firebase-messaging-sw.js] Received background message ",
//         payload
//     );
//     const notificationTitle = "Background Message Title";
//     const notificationOptions = {
//         body: "Background Message body.",
//         icon: "/firebase-logo.png",
//     };

//     self.registration.showNotification(notificationTitle, notificationOptions);
// });