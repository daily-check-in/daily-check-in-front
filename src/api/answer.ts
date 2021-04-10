import { AxiosPromise } from 'axios';
import instance from '../utils/instance';
import { Answer } from '../interfaces/index';

const api = {
	answer: '/answer',
	like: '/like',
	emotion: '/emotion'
};

function fetchAnswer(page: number, limit: number): AxiosPromise<Answer[]> {
	const url = `${api.answer}?page=${page}&limit=${limit}`;
	return instance.get(url);
}

function postLike(id: number): AxiosPromise {
	const url = `${api.like}`;
	const data = { answer_id: id };
	return instance.post(url, data);
}

function deleteLike(id: number): AxiosPromise {
	const url = `${api.like}`;
	const params = { like_id: id };
	return instance.delete(url, { params });
}

function fetchEmotion(): AxiosPromise {
	const url = `${api.emotion}`;
	return instance.get(url);
}

function postAnswer(data: {
	emotion_id: number;
	content: string;
}): AxiosPromise {
	const url = `${api.answer}`;
	return instance.post(url, data);
}

export { fetchAnswer, postLike, deleteLike, fetchEmotion, postAnswer };
