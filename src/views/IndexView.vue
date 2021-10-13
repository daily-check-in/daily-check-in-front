<template>
	<v-row>
		<v-col>
			<v-hover v-slot="{ hover }">
				<v-card
					:elevation="hover ? 6 : 2"
					:class="{ 'on-hover': hover }"
					class="mb-6"
					@click="goWrite()"
				>
					<v-card-title class="grey--text">
						{{ randomTodayText }}
					</v-card-title>
				</v-card>
			</v-hover>

			<BaseCard
				v-for="(item, index) in answerItems"
				:key="`card-${index}`"
				:item="item"
				:reply.sync="reply[index]"
				class="mb-6"
				@deleteAnswer="deleteAnswer(...arguments)"
				@showReply="showReply(...arguments)"
				@hideReply="hideReply(...arguments)"
				@postReply="postReply(...arguments)"
				@setReply="setReply(...arguments)"
				@updateReply="updateReply(...arguments)"
				@deleteReply="deleteReply(...arguments)"
			/>
			<infinite-loading spinner="waveDots" @infinite="infiniteHandler" />
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseCard from '@/components/BaseCard.vue';
import { ActionTypes } from '@/store/actions';
import { MutationTypes } from '@/store/mutations';
import { AnswerResponse, UserInfo } from '@/interfaces';

export default Vue.extend({
	name: 'IndexView',
	data() {
		return {
			infiniteId: +new Date(),
			reply: [] as string[]
		};
	},
	computed: {
		user(): UserInfo {
			return this.$store.getters.getUser;
		},
		answerItems(): AnswerResponse {
			return this.$store.getters.getAnswer;
		},
		limit(): number {
			return this.$store.getters.getLimit;
		},
		page(): number {
			return this.$store.getters.getPage;
		},
		replyId(): number | null {
			return this.$store.getters.getReplyId;
		},
		randomTodayText(): string {
			const userName = this.user.display_name;
			const textItems = [
				', 오늘 하루는 어떠셨나요?',
				'의 하루가 궁금해요!',
				', 고민거리 있으세요?',
				', 무슨 생각을 하고 계신가요'
			];
			const randomNumber = Math.floor(Math.random() * (textItems.length - 0));
			return `${userName}님${textItems[randomNumber]}`;
		}
	},
	mounted() {
		this.$gtm.trackEvent({
			event: 'viewCheckInList',
			user_uid: this.user.uid,
			user_email: this.user.email
		});
	},
	methods: {
		init() {
			this.$store.commit(MutationTypes.SET_PAGE, 1);
			this.infiniteId += 1;
		},
		async infiniteHandler($state: {
			loaded: () => void;
			complete: () => void;
			error: () => void;
		}) {
			try {
				const payload = {
					page: this.page,
					limit: this.limit
				};
				const { data } = await this.$store
					.dispatch(ActionTypes.FETCH_ANSWER_ITEMS, payload)
					.then(response => {
						return response;
					});

				if (data.data.length > 0) {
					this.$store.commit(MutationTypes.SET_PAGE, this.page + 1);
					this.reply = [
						...this.reply,
						...Array.from({ length: data.data.length }, () => '')
					];
					this.$store.commit(MutationTypes.SET_ANSWER, [
						...this.answerItems,
						...data.data
					]);
					$state.loaded();
				} else {
					$state.complete();
				}
			} catch {
				$state.error();
			}
		},
		goWrite() {
			this.$router.push(`/write`);
		},
		async deleteAnswer(id: number) {
			try {
				const data = { answer_id: id };
				const { status } = await this.$store
					.dispatch(ActionTypes.DELETE_ANSWER, data)
					.then(response => {
						return response;
					});

				if (status === 204) {
					this.$store.commit(MutationTypes.REMOVE_OBJECT_FROM_ANSWER, id);
					this.$dialog.notify.success('삭제되었습니다.', {
						position: `${
							this.$vuetify.breakpoint.mobile ? 'bottom' : 'top'
						}-right`
					});
				}
			} catch (e) {
				console.log(e);
				this.$dialog.notify.error('오류입니다. 다시 시도해주세요.', {
					position: `${
						this.$vuetify.breakpoint.mobile ? 'bottom' : 'top'
					}-right`
				});
			}
		},
		hideReply(id: number) {
			const index = this.answerItems.findIndex(
				(item: { id: number }) => item.id === id
			);
			const payload = {
				index,
				comment: []
			};
			this.$store.commit(MutationTypes.SET_REPLY, payload);
			this.$forceUpdate();
		},
		async showReply(id: number) {
			try {
				const params = { answer_id: id };
				const { data, status } = await this.$store
					.dispatch(ActionTypes.FETCH_ANSWER, params)
					.then(response => {
						return response;
					});

				if (status === 200) {
					const { comment } = data;
					const index = this.answerItems.findIndex(
						(item: { id: number }) => item.id === id
					);
					const payload = {
						index,
						comment
					};
					this.$store.commit(MutationTypes.SET_REPLY, payload);
				}
			} catch (e) {
				console.log(e);
				this.$dialog.notify.error('오류입니다. 다시 시도해주세요.', {
					position: `${
						this.$vuetify.breakpoint.mobile ? 'bottom' : 'top'
					}-right`
				});
			} finally {
				this.$forceUpdate();
			}
		},
		async postReply(id: number, reply: string) {
			try {
				const payload = {
					answer_id: id,
					content: reply
				};
				const { status } = await this.$store
					.dispatch(ActionTypes.POST_REPLY, payload)
					.then(response => {
						return response;
					});

				if (status === 200) {
					const index = this.answerItems.findIndex(
						(item: { id: number }) => item.id === id
					);
					this.reply[index] = '';
					this.answerItems[index].comment_count += 1;
					await this.showReply(id);
				}
			} catch (e) {
				console.log(e);
				this.$dialog.notify.error('오류입니다. 다시 시도해주세요.', {
					position: `${
						this.$vuetify.breakpoint.mobile ? 'bottom' : 'top'
					}-right`
				});
			} finally {
				this.$forceUpdate();
			}
		},
		setReply(answerId: number, id: number) {
			this.$store.commit(MutationTypes.SET_REPLY_ID, id);

			const answerIndex = this.answerItems
				.map((item: { id: number }): number => item.id)
				.indexOf(answerId);

			const answerItem = this.answerItems[answerIndex];
			const comment = answerItem.comment;

			if (comment) {
				const replyIndex = comment
					.map((item: { id: number }) => item.id)
					.indexOf(id);

				this.reply[answerIndex] = comment[replyIndex].content;
				this.$forceUpdate();
			}
		},
		async updateReply(answerId: number) {
			try {
				const answerIndex = this.answerItems
					.map((item: { id: number }): number => item.id)
					.indexOf(answerId);

				const data = {
					comment_id: this.replyId as number,
					content: this.reply[answerIndex]
				};

				const { status } = await this.$store
					.dispatch(ActionTypes.UPDATE_REPLY, data)
					.then(response => {
						return response;
					});

				if (status === 204) {
					this.reply[answerIndex] = '';
					this.$store.commit(MutationTypes.SET_REPLY_ID, null);
					this.showReply(answerId);
				}
			} catch (e) {
				console.log(e);
				this.$dialog.notify.error('오류입니다. 다시 시도해주세요.', {
					position: `${
						this.$vuetify.breakpoint.mobile ? 'bottom' : 'top'
					}-right`
				});
			} finally {
				this.$forceUpdate();
			}
		},
		async deleteReply(answerId: number, id: number) {
			try {
				const data = { comment_id: id };
				const { status } = await this.$store
					.dispatch(ActionTypes.DELETE_REPLY, data)
					.then(response => {
						return response;
					});

				if (status === 204) {
					const answerIndex = this.answerItems
						.map((item: { id: number }): number => item.id)
						.indexOf(answerId);

					this.$store.commit(MutationTypes.REMOVE_OBJECT_FROM_REPLY, {
						answerIndex,
						id
					});

					this.answerItems[answerIndex].comment_count -= 1;
					this.showReply(answerId);
					this.$dialog.notify.success('삭제되었습니다.', {
						position: `${
							this.$vuetify.breakpoint.mobile ? 'bottom' : 'top'
						}-right`
					});
				}
			} catch (e) {
				console.log(e);
				this.$dialog.notify.error('오류입니다. 다시 시도해주세요.', {
					position: `${
						this.$vuetify.breakpoint.mobile ? 'bottom' : 'top'
					}-right`
				});
			} finally {
				this.$forceUpdate();
			}
		}
	},
	components: { BaseCard }
});
</script>
