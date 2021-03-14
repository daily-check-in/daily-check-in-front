import { ActionContext } from 'vuex';
import { Mutations } from './mutations';
import { RootState } from './state';
import { fetchAnswer } from '../api/answer';

export enum ActionTypes {
	FETCH_ANSWER = 'FETCH_ANSWER'
}

type MyActionContext = {
	commit<K extends keyof Mutations>(
		key: K,
		payload?: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>;
} & Omit<ActionContext<RootState, RootState>, 'commit'>;

export const actions = {
	async [ActionTypes.FETCH_ANSWER](
		context: MyActionContext,
		payload: { page: number; limit: number }
	) {
		const { page, limit } = payload;
		return await fetchAnswer(page, limit);
	}
};

export type Actions = typeof actions;
