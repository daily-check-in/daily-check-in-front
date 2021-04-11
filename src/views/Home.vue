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

			<Card
				v-for="(item, index) in answerItems"
				:key="`card-${index}`"
				:item="item"
				:reply.sync="reply[index]"
				class="mb-6"
				@deleteAnswer="deleteAnswer(...arguments)"
				@showReply="showReply(...arguments)"
				@postReply="postReply(...arguments)"
			/>
			<infinite-loading spinner="waveDots" @infinite="infiniteHandler" />
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Card from '@/components/Card.vue';
import { ActionTypes } from '@/store/actions';
import { MutationTypes } from '@/store/mutations';
import { User } from '@/interfaces';
import { hasOwnProperty } from '@/utils/hasOwnProperty';

export default Vue.extend({
	name: 'Home',
	data() {
		return {
			infiniteId: +new Date(),
			reply: []
		};
	},
	computed: {
		user(): User {
			return this.$store.getters.getUser;
		},
		answerItems(): any {
			return this.$store.getters.getAnswer;
		},
		limit(): number {
			return this.$store.getters.getLimit;
		},
		page(): number {
			return this.$store.getters.getPage;
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
	methods: {
		init() {
			this.$store.commit(MutationTypes.SET_PAGE, 1);
			this.infiniteId += 1;
		},
		infiniteHandler($state: {
			loaded: () => void;
			complete: () => void;
			error: () => void;
		}) {
			try {
				const payload = {
					page: this.page,
					limit: this.limit
				};
				this.$store
					.dispatch(ActionTypes.FETCH_ANSWER_ITEMS, payload)
					.then(({ data }) => {
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
					});
			} catch {
				$state.error();
			}
		},
		goWrite() {
			this.$router.push(`/write`);
		},
		async deleteAnswer(id: number) {
			try {
				console.log(id);
				const data = {
					answer_id: id
				};
				const response = await this.$store
					.dispatch(ActionTypes.DELETE_ANSWER, { data })
					.then(response => {
						return response;
					});
				console.log(response);

				this.$store.commit(MutationTypes.REMOVE_OBJECT_FROM_ARRAY, id);
				this.$dialog.notify.success('삭제되었습니다.', {
					position: 'top-right'
				});
			} catch (e) {
				console.log(e);
				this.$dialog.notify.error('오류입니다. 다시 시도해주세요.', {
					position: 'top-right'
				});
			}
		},
		async showReply(id: number) {
			console.log(id);
			try {
				const params = { answer_id: id };
				const { data, status } = await this.$store
					.dispatch(ActionTypes.FETCH_ANSWER, params)
					.then(response => {
						return response;
					});
				console.log(data);
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
			} finally {
				this.$forceUpdate();
			}
		},
		async postReply(id: number, reply: string) {
			try {
				const index = this.answerItems.findIndex(
					(item: { id: number }) => item.id === id
				);
				const payload = {
					answer_id: id,
					content: reply
				};
				const { data, status } = await this.$store
					.dispatch(ActionTypes.POST_REPLY, payload)
					.then(response => {
						return response;
					});
				console.log(data, status);
				if (status === 204) {
					let comment: {}[] = [];
					if (hasOwnProperty(this.answerItems[index], 'comment')) {
						comment = [...this.answerItems[index].comment];
					}
					comment.push({
						answer_id: id,
						content: reply,
						user: this.user,
						user_id: this.user.id
					});

					const payload = {
						index,
						comment
					};
					this.$store.commit(MutationTypes.SET_REPLY, payload);
					this.answerItems[index].comment_count += 1;
					this.reply[index] = '';
				}
			} catch (e) {
				console.log(e);
			} finally {
				this.$forceUpdate();
			}
		}
	},
	components: { Card }
});
</script>
