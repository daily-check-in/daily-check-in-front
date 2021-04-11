import { RootState } from './state';
import { setAxiosToken } from '../plugins/axios';
import { User, Emotion, Answer } from '../interfaces/index';

export enum MutationTypes {
	SET_TOKEN = 'SET_TOKEN',
	SET_USER = 'SET_USER',
	SET_ANSWER = 'SET_ANSWER',
	SET_PAGE = 'SET_PAGE',
	SET_LIMIT = 'SET_LIMIT',
	SET_EMOTION = 'SET_EMOTION',
	REMOVE_OBJECT_FROM_ARRAY = 'REMOVE_OBJECT_FROM_ARRAY'
	SET_LOADING = 'SET_LOADING'
}

export const mutations = {
	[MutationTypes.SET_TOKEN](state: RootState, token: string) {
		state.token = token;
		setAxiosToken(token);
	},
	[MutationTypes.SET_USER](state: RootState, user: User) {
		state.user = user;
	},
	[MutationTypes.SET_ANSWER](state: RootState, answer: Answer) {
		state.answer = answer;
	},
	[MutationTypes.SET_PAGE](state: RootState, page: number) {
		state.page = page;
	},
	[MutationTypes.SET_LIMIT](state: RootState, limit: number) {
		state.limit = limit;
	},
	[MutationTypes.SET_EMOTION](state: RootState, emotion: Emotion) {
		state.emotion = emotion;
	},
	[MutationTypes.REMOVE_OBJECT_FROM_ARRAY](state: RootState, id: number) {
		const index = state.answer
			.map((item: { id: number }) => item.id)
			.indexOf(id);
		state.answer.splice(index, 1);
	},
	[MutationTypes.SET_LOADING](state: RootState, isLoading: boolean) {
		state.isLoading = isLoading;
	}
};

export type Mutations = typeof mutations;
