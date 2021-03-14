const state = {
	token: '',
	user: {},
	page: 1,
	limit: 10,
	answer: []
};

type RootState = typeof state;

export { state, RootState };
