import { RootState } from './state';
import { setAxiosToken } from '../plugins/axios';
import { User, Emotion } from '../interfaces/index';

export enum MutationTypes {
	SET_TOKEN = 'SET_TOKEN',
	SET_USER = 'SET_USER',
	SET_ANSWER = 'SET_ANSWER',
	SET_PAGE = 'SET_PAGE',
	SET_LIMIT = 'SET_LIMIT',
	SET_EMOTION = 'SET_EMOTION'
}

export const mutations = {
	[MutationTypes.SET_TOKEN](state: RootState, token: string) {
		state.token = token;
		setAxiosToken(token);
	},
	[MutationTypes.SET_USER](state: RootState, user: User) {
		state.user = user;
	},
	[MutationTypes.SET_ANSWER](state: RootState, answer: any) {
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
	}
};

export type Mutations = typeof mutations;
