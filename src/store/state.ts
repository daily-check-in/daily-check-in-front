import { UserInfo, AnswerResponse, EmotionResponse } from '@/interfaces';

const state = {
	token: '',
	user: {} as UserInfo,
	page: 1,
	limit: 10,
	answer: [] as AnswerResponse,
	emotion: [] as EmotionResponse,
	isLoading: false,
	replyId: null as number | null
};

type RootState = typeof state;

export { state, RootState };
