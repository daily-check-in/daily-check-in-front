<template>
	<v-row>
		<v-col class="pb-4">
			<v-card>
				<v-card-title class="font-weight-bold px-4 py-2">
					오늘 하루는 어떠셨나요?
				</v-card-title>
				<v-chip-group
					v-model="emotionItem"
					column
					active-class="success success--text font-weight-bold"
					class="px-2"
				>
					<v-chip v-for="item in emotion" :key="item.id" outlined>
						<span class="text-h6 mr-1"> {{ item.emoji }}</span>
						{{ item.name }}
					</v-chip>
				</v-chip-group>
			</v-card>

			<v-card min-height="50vh" class="my-4">
				<Editor :content.sync="content" :placeholder="placeholder" />
			</v-card>

			<v-btn
				v-show="!$vuetify.breakpoint.mobile"
				color="success"
				:disabled="isValid"
				class="float-right"
				@click="postAnswer"
			>
				작성완료
			</v-btn>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Editor from '@/components/Editor.vue';
import Vue from 'vue';
import { ActionTypes } from '@/store/actions';
import { MutationTypes } from '@/store/mutations';
import eventBus from '../utils/bus';

export default Vue.extend({
	name: 'Write',
	data() {
		return {
			content: '',
			emotionItem: 0
		};
	},
	computed: {
		emotion() {
			return this.$store.getters.getEmotion;
		},
		placeholder() {
			return '느낀 점과 배운 점, 팀에 공유하고 싶은 말이 있으면 알려주세요.';
		},
		isValid() {
			return this.content === '';
		}
	},
	created() {
		this.fetchEmotion();
		this.setEventBus();
	},
	beforeDestroy() {
		eventBus.$off('postAnswer');
	},
	methods: {
		fetchEmotion() {
			try {
				this.$store.dispatch(ActionTypes.FETCH_EMOTION).then(response => {
					this.$store.commit(MutationTypes.SET_EMOTION, response);
					console.log(response);
				});
			} catch (e) {
				console.log(e);
			}
		},
		setEventBus() {
			eventBus.$on('postAnswer', this.postAnswer);
		},
		async postAnswer() {
			try {
				const data = {
					emotion_id: this.emotion[this.emotionItem].id,
					content: this.content
				};
				await this.$store.dispatch(ActionTypes.POST_ANSWER, data).then(res => {
					console.log(res);
				});
			} catch (e) {
				console.log(e);
			}
		}
	},
	components: { Editor }
});
</script>

<style lang="scss" scoped></style>
