import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import firebase from './plugins/firebase';
import './plugins';
Vue.config.productionTip = false;

firebase.default.auth().onAuthStateChanged(async user => {
	console.log(user);
	if (user) {
		await user.getIdToken().then((token: string) => {
			store.commit('setToken', token);
		});

		const userInfo = user?.providerData[0];
		store.commit('setUser', userInfo);
	}

	new Vue({
		router,
		store,
		vuetify,
		render: h => h(App)
	}).$mount('#app');
});
