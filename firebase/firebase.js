import {
    initializeApp,
    getApps,
    getApp
} from "firebase/app";
// import { doc, getFirestore, setDoc } from "firebase/firestore";
import localforage from "localforage";
import {
    getMessaging,
    getToken,
    onMessage,
} from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyCh8ZSnw_Xc1fA1fnC-7gZq88Cu6ok-W0w",
    authDomain: "finhub-notification.firebaseapp.com",
    projectId: "finhub-notification",
    storageBucket: "finhub-notification.appspot.com",
    messagingSenderId: "24520901622",
    appId: "1:24520901622:web:200d279b5f5fe5c8fcfdd7",
    measurementId: "G-YV89S20E4L"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();

const firebaseCloudMessaging = {
    tokenInlocalforage: async () => {
        const token = await localforage.getItem("fcm_token");
        console.log('token', token);
        
        return token;
    },
    onMessage: async () => {
        const messaging = getMessaging(app);
        
        onMessage(messaging, (payload) => {
            console.log("Message received. ", payload);
            new Notification(payload.notification.title, {
                body: payload.notification.body
            })
        });
    },

    init: async function () {

        try {
            const messaging = getMessaging(app);

            const tokenInLocalForage = await this.tokenInlocalforage();
            //if FCM token is already there just return the token
            if (tokenInLocalForage !== null) {
                console.log('1')
                return tokenInLocalForage;
            }
            //requesting notification permission from browser
            const status = await Notification.requestPermission();
            if (status && status === 'granted') {
                console.log('12321')
                //getting token from FCM
                const fcm_token = await getToken(messaging, {
                    vapidKey: 'BK9z_duI_hPbY3syt_G7w6ClEvNr3va5ll9bP73Ilc6GEaKBSmqk03_nPAG70Phze1xonJvS0lQtDttKAZn9pN0'
                });
                console.log('token' , fcm_token);
                if (fcm_token) {
                    //setting FCM token in indexed db using localforage
                    localforage.setItem('fcm_token', fcm_token);
                    console.log('fcm_token', fcm_token);
                    //return the FCM token after saving it
                    return fcm_token;
                }
            }
        } catch (error) {
            console.log(error.message);
            return null;
        }
    },
};


export {
    firebaseCloudMessaging,
    app
};