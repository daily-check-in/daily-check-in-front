import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from './plugins/firebase';
import './plugins';
import { fetchUserInfo } from './api/auth';
Vue.config.productionTip = false;

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
		console.log(data);
		store.commit('SET_USER', data);
	}

	new Vue({
		router,
		store,
		vuetify,
		render: h => h(App)
	}).$mount('#app');
});
