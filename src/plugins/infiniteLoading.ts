import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, {
	slots: {
		noResults: '글이 없어요 :(',
		noMore: '글을 다 읽으셨어요!',
		error: '앗, 미끄러졌어요. 아래 버튼을 눌러보실래요?'
	}
});
