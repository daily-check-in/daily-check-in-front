import { RootState } from './state';
import { hasOwnProperty } from '@/utils/hasOwnProperty';

export const getters = {
	getToken(state: RootState) {
		return state.token;
	},
	getUser: (state: RootState) => {
		return state.user;
	},
	isSignIn(state: RootState) {
		return hasOwnProperty(state.user, 'id');
	},
	getAnswer(state: RootState) {
		return state.answer;
	},
	getPage(state: RootState) {
		return state.page;
	},
	getLimit(state: RootState) {
		return state.limit;
	},
	getEmotion(state: RootState) {
		return state.emotion;
	},
	hasEmotion(state: RootState) {
		return state.emotion.length > 0;
	},
	getReplyId(state: RootState) {
		return state.replyId;
	},
	isModifyReply(state: RootState) {
		return state.replyId !== null;
	}
};

export type Getters = typeof getters;
