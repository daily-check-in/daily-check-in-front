import Vue from 'vue';
import Vuex from 'vuex';
import { setAxiosToken } from '../../plugins/axios';

Vue.use(Vuex);

const auth = {
	state: {
		token: null,
		user: null
	},
	getters: {
		isUser: (state: any) => {
			return state.user !== null;
		}
	},
	mutations: {
		setUser(state: any, payload: any) {
			state.user = payload;
		},
		setToken(state: any, payload: any) {
			state.token = payload;
			setAxiosToken(payload);
		}
	},
	actions: {},
	modules: {}
};

export default auth;
