import { authGuard } from './authGuard';

export default [
	{
		path: '*',
		name: 'NotFound',
		meta: {
			layout: 'ErrorLayout'
		},
		component: () =>
			import(/* webpackChunkName: "notFound" */ '../views/NotFoundView.vue')
	},
	{
		path: '/',
		name: 'Home',
		meta: {
			layout: 'DefaultLayout'
		},
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
		beforeEnter: authGuard()
	},
	{
		path: '/signin',
		name: 'SignIn',
		meta: {
			layout: 'ErrorLayout'
		},
		component: () =>
			import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue')
	},
	{
		path: '/write/:id?',
		name: 'Write',
		meta: {
			layout: 'DefaultLayout',
			detail: true
		},
		component: () =>
			import(/* webpackChunkName: "write" */ '../views/Write.vue'),
		beforeEnter: authGuard()
	}
];
