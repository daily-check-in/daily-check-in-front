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
					<v-chip v-for="item in orderByRandomEmotion" :key="item.id" outlined>
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
				@click="handleSubmit()"
			>
				{{ $_writeButtonName }}
			</v-btn>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Editor from '@/components/Editor.vue';
import { ActionTypes } from '@/store/actions';
import { MutationTypes } from '@/store/mutations';
import eventBus from '../utils/bus';
import writeMixin from '../mixins/writeMixin';
import { Emotion } from '@/interfaces';

export default writeMixin.extend({
	name: 'Write',
	data() {
		return {
			content: '',
			emotionItem: 0,
			answerId: null
		};
	},
	computed: {
		emotion(): Emotion {
			return this.$store.getters.getEmotion;
		},
		orderByRandomEmotion() {
			return this.emotion.sort(() => {
				return Math.random() - Math.random();
			});
		},
		placeholder() {
			return '느낀 점과 배운 점, 팀에 공유하고 싶은 말이 있으면 알려주세요.';
		},
		isValid() {
			return this.content === '';
		},
		hasEmotion() {
			return this.$store.getters.hasEmotion;
		}
	},
	async created() {
		if (!this.hasEmotion) {
			await this.fetchEmotion();
		}
		this.setEventBus();

		if (this.$_isModify) {
			await this.fetchAnswer();
		}
	},
	beforeDestroy() {
		eventBus.$off('submitAnswer');
	},
	methods: {
		async fetchEmotion() {
			try {
				const { data, status } = await this.$store
					.dispatch(ActionTypes.FETCH_EMOTION)
					.then(response => {
						return response;
					});
				// console.log(data);
				if (status === 200) {
					this.$store.commit(MutationTypes.SET_EMOTION, data);
				}
			} catch (e) {
				console.log(e);
			}
		},
		setEventBus() {
			eventBus.$on('submitAnswer', (payload: boolean) => {
				if (payload) {
					this.updateAnswer();
				} else {
					this.postAnswer();
				}
			});
		},
		async fetchAnswer() {
			try {
				const params = { answer_id: this.$route.params.id };
				const { data, status } = await this.$store
					.dispatch(ActionTypes.FETCH_ANSWER, params)
					.then(response => {
						return response;
					});
				// console.log(data);
				if (status === 200) {
					const { content, emotion_id, id } = data;
					this.content = content;
					this.answerId = id;
					this.emotionItem = this.orderByRandomEmotion.findIndex(
						(item: { id: number }) => item.id === emotion_id
					);
				}
			} catch (e) {
				console.log(e);
			}
		},
		handleSubmit() {
			if (this.$_isModify) {
				this.updateAnswer();
			} else {
				this.postAnswer();
			}
		},
		async updateAnswer() {
			try {
				const data = {
					answer_id: this.answerId,
					emotion_id: this.orderByRandomEmotion[this.emotionItem].id,
					content: this.content
				};
				const { status } = await this.$store
					.dispatch(ActionTypes.UPDATE_ANSWER, data)
					.then(response => {
						return response;
					});
				// console.log(status);
				if (status === 204) {
					location.href = '/';
				}
			} catch (e) {
				console.log(e);
			}
		},
		async postAnswer() {
			try {
				const data = {
					emotion_id: this.orderByRandomEmotion[this.emotionItem].id,
					content: this.content
				};
				const { status } = await this.$store
					.dispatch(ActionTypes.POST_ANSWER, data)
					.then(response => {
						return response;
					});

				if (status === 204) {
					location.href = '/';
				}
			} catch (e) {
				console.log(e);
				this.$dialog.notify.error('오류입니다. 다시 시도해주세요.', {
					position: `${
						this.$vuetify.breakpoint.mobile ? 'bottom' : 'top'
					}-right`
				});
			}
		}
	},
	components: { Editor }
});
</script>

<style lang="scss" scoped></style>
