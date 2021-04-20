import instance from '@/utils/instance';

function fetchUserInfo() {
	return instance.get('/user/me');
}

export { fetchUserInfo };
