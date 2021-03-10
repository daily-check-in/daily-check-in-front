import { Route } from 'vue-router';
import store from '../store';

export const authGuard: Function = () => (
	to: Route,
	from: Route,
	next: any
) => {
	if (store.getters.isUser) {
		return next();
	}
	next('/signIn');
};
