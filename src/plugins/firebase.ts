import * as firebase from 'firebase/compat/app';
import 'firebase/analytics';
import { getMessaging, getToken } from 'firebase/messaging';
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

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();

getToken(messaging)
	.then(currentToken => {
		if (currentToken) {
			console.log(currentToken);
			prompt('fcm token', currentToken);
		} else {
			// Show permission request UI
			console.log(
				'No registration token available. Request permission to generate one.'
			);
			// ...
		}
	})
	.catch(err => {
		console.log('An error occurred while retrieving token. ', err);
		// ...
	});

export default firebase;
