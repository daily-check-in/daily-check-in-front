import store from '@/store';
import { MutationTypes } from '@/store/mutations';
import { instance } from '../plugins/axios';

instance.interceptors.request.use(
	config => {
		store.commit(MutationTypes.SET_LOADING, true);
		return config;
	},
	error => {
		store.commit(MutationTypes.SET_LOADING, false);
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	response => {
		store.commit(MutationTypes.SET_LOADING, false);
		return response;
	},
	error => {
		store.commit(MutationTypes.SET_LOADING, false);
		return Promise.reject(error);
	}
);

export default instance;
