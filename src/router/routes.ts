import { authGuard } from './authGuard';

export default [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
		beforeEnter: authGuard()
	},
	{
		path: '/about',
		name: 'About',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
		beforeEnter: authGuard()
	},
	{
		path: '/signIn',
		name: 'SignIn',
		component: () =>
			import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue')
	}
];
