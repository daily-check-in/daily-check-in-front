importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js');
importScripts(
	'https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js'
);

// Set Firebase configuration, once available
self.addEventListener('fetch', () => {
	const urlParams = new URLSearchParams(location.search);
	self.firebaseConfig = Object.fromEntries(urlParams);
});

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
	apiKey: true,
	projectId: true,
	messagingSenderId: true,
	appId: true
};

// Initialize Firebase app
firebase.initializeApp(self.firebaseConfig || defaultConfig);

// const messaging = firebase.messaging();
// background message handle
// messaging.setBackgroundMessageHandler(payload => {
// 	console.log('Message received. ', payload);
// 	// Customize notification here
// 	const title = 'Background Message Title';
// 	const options = {
// 		body: payload.data.message,
// 		icon: '/firebase-logo.png'
// 	};
//
// 	return self.registration.showNotification(title, options);
// });

self.addEventListener('push', function(event) {
	const data = event.data.json();
	console.log(data);
	const notification = data.notification;
	const title = notification.title;
	const options = {
		body: notification.body,
		icon: notification.icon
	};
	self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
	const url = '/';
	event.notification.close();
	event.waitUntil(clients.openWindow(url));
});
