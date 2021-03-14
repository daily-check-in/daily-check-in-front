import { AxiosPromise } from 'axios';
import instance from '../utils/instance';
import { Answer } from '../interfaces/index';

const api = {
	answer: '/answer'
};

function fetchAnswer(page: number, limit: number): AxiosPromise<Answer[]> {
	const url = `${api.answer}?page=${page}&limit=${limit}`;
	return instance.get(url);
}

export { fetchAnswer };
