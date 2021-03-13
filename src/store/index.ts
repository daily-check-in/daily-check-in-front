import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		windowWidth: 0
	},
	getters: {
		isMobile: state => {
			return state.windowWidth < 600;
		},
		isTablet: state => {
			return state.windowWidth > 600 && state.windowWidth < 960;
		},
		isPc: state => {
			return state.windowWidth > 960;
		}
	},
	mutations: {
		setWindowWidth(state, payload) {
			state.windowWidth = payload;
		}
	},
	actions: {},
	modules: {
		auth
	}
});
