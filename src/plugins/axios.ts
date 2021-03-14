import axios from 'axios';

export const instance = axios.create({
	baseURL: process.env.VUE_APP_BASE_URL,
	headers: {
		'Content-type': 'application/json'
	},
	timeout: 5000
});

export function setAxiosToken(token: string) {
	instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}
