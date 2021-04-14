import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from './plugins/firebase';
import VueAnalytics from 'vue-analytics';
import VueGtm from 'vue-gtm';
import './plugins';
import { fetchUserInfo } from './api/auth';
Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
	id: process.env.VUE_APP_ANALYTICS_ID,
	router,
	autoTracking: {
		pageviewOnLoad: false
	}
});

Vue.use(VueGtm, {
	id: process.env.VUE_APP_GTM_ID,
	vueRouter: router
});

// async fetchUserInfo() {
// 	const response = await fetchUserInfo().then(({ data }) => {
// 		console.log(data);
// 		return data;
// 	});
// 	// console.log(userInfo);
// }

firebase.default.auth().onAuthStateChanged(async user => {
	// console.log(user);
	if (user) {
		await user.getIdToken().then((token: string) => {
			store.commit('SET_TOKEN', token);
		});

		const userInfo = user?.providerData[0];
		store.commit('SET_USER', userInfo);

		const { data } = await fetchUserInfo().then(response => {
			return response;
		});
		store.commit('SET_USER', data);

		const isSignIn = location.pathname.indexOf('signin') > -1;
		if (isSignIn) {
			location.href = '/';
		}
	}

	new Vue({
		router,
		store,
		vuetify,
		render: h => h(App)
	}).$mount('#app');
});
