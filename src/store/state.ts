import { User } from '../interfaces';

const state = {
	token: '',
	user: {} as User,
	page: 1,
	limit: 10,
	answer: []
};

type RootState = typeof state;

export { state, RootState };
