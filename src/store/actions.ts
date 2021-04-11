import { ActionContext } from 'vuex';
import { Mutations } from './mutations';
import { RootState } from './state';
import {
	fetchAnswerItems,
	postLike,
	deleteLike,
	fetchEmotion,
	postAnswer,
	fetchAnswer,
	updateAnswer
} from '../api/answer';

export enum ActionTypes {
	FETCH_ANSWER_ITEMS = 'FETCH_ANSWER_ITEMS',
	POST_LIKE = 'POST_LIKE',
	DELETE_LIKE = 'DELETE_LIKE',
	FETCH_EMOTION = 'FETCH_EMOTION',
	POST_ANSWER = 'POST_ANSWER',
	FETCH_ANSWER = 'FETCH_ANSWER',
	UPDATE_ANSWER = 'UPDATE_ANSWER'
}

type MyActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload?: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RootState, RootState>, 'commit'>;

export const actions = {
	async [ActionTypes.FETCH_ANSWER_ITEMS](
		context: MyActionContext,
		payload: { page: number; limit: number }
	) {
		const { page, limit } = payload;
		return await fetchAnswerItems(page, limit);
	},
	async [ActionTypes.POST_LIKE](context: MyActionContext, payload: number) {
		return await postLike(payload);
	},
	async [ActionTypes.DELETE_LIKE](context: MyActionContext, payload: number) {
		return await deleteLike(payload);
	},
	async [ActionTypes.FETCH_EMOTION]() {
		return await fetchEmotion();
	},
	async [ActionTypes.POST_ANSWER](
		context: MyActionContext,
		payload: { emotion_id: number; content: string }
	) {
		return await postAnswer(payload);
	},
	async [ActionTypes.FETCH_ANSWER](
		context: MyActionContext,
		payload: { answer_id: number }
	) {
		return await fetchAnswer(payload);
	},
	async [ActionTypes.UPDATE_ANSWER](
		context: MyActionContext,
		payload: { answer_id: number; emotion_id: number; content: string }
	) {
		return await updateAnswer(payload);
	}
};

export type Actions = typeof actions;
