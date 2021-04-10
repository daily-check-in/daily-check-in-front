import { User, Emotion } from '../interfaces';

const state = {
	token: '',
	user: {} as User,
	page: 1,
	limit: 10,
	answer: [],
	emotion: ([] as unknown) as Emotion
};

type RootState = typeof state;

export { state, RootState };
