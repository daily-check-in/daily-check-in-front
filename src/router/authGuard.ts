import { Route } from 'vue-router';
import store from '../store';

export const authGuard: Function = () => (
	to: Route,
	from: Route,
	next: Function
) => {
	if (store.getters.isSignIn) {
		return next();
	}
	next('/signin');
};
