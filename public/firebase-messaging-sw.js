importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js');
importScripts(
	'https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js'
);

const config = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_DATABASE_URL,
	projectId: process.env.VUE_APP_PROJECT_ID,
	storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_APP_ID,
	measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

// 백그라운드 상태에서 받은 알림 처리
messaging.setBackgroundMessageHandler(payload => {
	console.log('Message received. ', payload);
	// Customize notification here
	const title = 'Background Message Title';
	const options = {
		body: payload.data.message,
		icon: '/firebase-logo.png'
	};

	return self.registration.showNotification(title, options);
});
