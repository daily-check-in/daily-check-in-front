import { authGuard } from './authGuard';

export default [
	{
		path: '*',
		name: 'NotFound',
		meta: {
			layout: 'ErrorLayout'
		},
		component: () =>
			import(/* webpackChunkName: "notFound" */ '@/views/NotFoundView.vue')
	},
	{
		path: '/',
		name: 'Index',
		meta: {
			layout: 'DefaultLayout'
		},
		component: () =>
			import(/* webpackChunkName: "index" */ '@/views/IndexView.vue'),
		beforeEnter: authGuard()
	},
	{
		path: '/signin',
		name: 'SignIn',
		meta: {
			layout: 'ErrorLayout'
		},
		component: () =>
			import(/* webpackChunkName: "signIn" */ '@/views/SignInView.vue')
	},
	{
		path: '/write/:id?',
		name: 'Write',
		meta: {
			layout: 'DefaultLayout',
			detail: true
		},
		component: () =>
			import(/* webpackChunkName: "write" */ '@/views/WriteView.vue'),
		beforeEnter: authGuard()
	}
];
