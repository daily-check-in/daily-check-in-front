import { RootState } from './state';

export const getters = {
	getToken(state: RootState) {
		return state.token;
	},
	getUser: (state: RootState) => {
		return state.user;
	},
	isUser(state: RootState) {
		return state.user !== '';
	},
	getAnswer(state: RootState) {
		return state.answer;
	},
	getPage(state: RootState) {
		return state.page;
	},
	getLimit(state: RootState) {
		return state.limit;
	}
};

export type Getters = typeof getters;
