import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/messaging';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_DATABASE_URL,
	projectId: process.env.VUE_APP_PROJECT_ID,
	storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_APP_ID,
	measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

firebase.default.initializeApp(firebaseConfig);
const messaging = firebase.default.messaging();

Notification.requestPermission().then(function(permission) {
	if (permission === 'granted') {
		console.log('Notification permission granted.');
	} else {
		console.log('Unable to get permission to notify.');
	}
});

messaging.getToken().then(token => console.log(token));

export default firebase;
