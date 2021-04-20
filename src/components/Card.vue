<template>
	<v-card class="pt-3">
		<v-list-item class="grow">
			<v-list-item class="mb-2 px-0">
				<Avatar
					:photo-url="item.user.photoURL"
					:display-name="item.user.display_name"
					class="mr-2"
				/>
				<v-list-item-content class="pt-2 pb-1">
					<v-list-item-title class="font-weight-medium">
						{{ item.user.display_name || item.user.email.split('@')[0] }}
					</v-list-item-title>
					<v-list-item-subtitle class="grey--text">
						{{ item.created_at }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-menu v-if="isMyContent(item.user.id)" bottom left>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon small v-bind="attrs" class="mb-4" v-on="on">
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="(menu, index) in privateMenu"
						:key="`private-menu-${index}`"
						class="py-0 px-2"
						@click="handleMyAnswer(menu, item.id)"
					>
						<v-btn text>{{ menu }}</v-btn>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-list-item>

		<v-card-text class="py-2">
			<v-alert class="mb-3 pa-2 pt-1 pb-0 d-inline-flex" color="grey lighten-3">
				<div class="d-flex flex-row align-center">
					<div class="headline mr-2">
						{{ item.emotion.emoji }}
					</div>
					<div
						class="black--text subtitle-2"
						v-html="
							`${
								item.user.display_name
									? `${item.user.display_name}님은`
									: '저는'
							} ${item.emotion.answer}`
						"
					/>
				</div>
			</v-alert>

			<div
				class="ql-editor py-2 card-content black--text"
				v-html="item.content"
			/>

			<div
				v-show="hasReaction(item)"
				class="mt-2 d-flex align-center justify-space-between"
			>
				<div>
					<div v-if="item.like_count > 0" class="d-flex align-center pa-0 pl-1">
						<v-icon small color="error" class="mr-1">
							mdi-heart
						</v-icon>
						<span class="subheading grey--text">{{ item.like_count }}</span>
					</div>
				</div>

				<v-btn
					v-show="item.comment_count > 0"
					text
					small
					class="px-1 grey--text"
					@click="handleReply(item.id)"
				>
					댓글
					{{ item.comment_count }}개
				</v-btn>
			</div>
		</v-card-text>

		<v-divider class="mx-4" />

		<v-card-actions class="pa-0">
			<v-list-item class="grow">
				<v-row align="center" class="d-flex justify-space-between">
					<v-col>
						<v-btn
							text
							block
							:color="likeColor(item.is_like)"
							@click="handleLike(item)"
						>
							<v-icon small class="mr-1" v-text="likeIcon(item.is_like)" />
							<span class="subheading mr-2">좋아요</span>
						</v-btn>
					</v-col>
					<v-divider vertical class="my-4" />
					<v-col>
						<v-btn text block color="grey" @click="setReplyFocus()">
							<v-icon small class="mr-1">mdi-comment-outline</v-icon>
							<span class="subheading">댓글 달기</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-list-item>
		</v-card-actions>

		<v-card-text class="py-0">
			<v-divider />
		</v-card-text>

		<!-- 댓글 달기 -->
		<v-card-text class="py-2 d-flex">
			<v-textarea
				:ref="`textarea-${item.id}`"
				v-model="sync_reply"
				:placeholder="item.emotion.comment"
				filled
				flat
				rounded
				auto-grow
				dense
				hide-details
				color="success"
				class="v-card__text mr-2"
				rows="1"
				row-height="12"
			>
			</v-textarea>
			<v-btn
				icon
				color="success"
				:disabled="sync_reply === ''"
				@click="handleReplySubmit()"
			>
				<v-icon>mdi-send</v-icon>
			</v-btn>
		</v-card-text>

		<!-- 댓글들 -->
		<v-card-text v-if="item.comment" class="pt-0 py-2 pr-2">
			<v-list class="py-0">
				<template v-for="(reply, index) in item.comment">
					<v-list-item :key="`reply-${index}`" class="px-0">
						<Avatar
							:photo-url="reply.user.photoURL"
							:display-name="reply.user.display_name"
							class="mr-2 align-self-start mt-2"
						/>

						<v-list-item-content class="d-inline-block py-1">
							<v-alert
								class="pa-2 px-4 mb-0 d-inline-block"
								color="grey lighten-4 rounded-xl"
								:style="commentStyle(reply.user_id)"
							>
								<div class="text-caption">
									<span class="font-weight-bold">
										{{
											reply.user.display_name || reply.user.email.split('@')[0]
										}}
									</span>
									<span class="grey--text">{{ reply.created_at }}</span>
								</div>
								<div class="text-body-2" v-html="reply.content" />
							</v-alert>

							<v-menu v-if="isMyContent(reply.user_id)" bottom left>
								<template v-slot:activator="{ on, attrs }">
									<v-btn icon x-small v-bind="attrs" class="ml-1" v-on="on">
										<v-icon>mdi-dots-vertical</v-icon>
									</v-btn>
								</template>

								<v-list>
									<v-list-item
										v-for="(menu, index) in privateMenu"
										:key="`private-menu-${index}`"
										class="py-0 px-2"
										@click="handleMyReply(menu, reply.id)"
									>
										<v-btn text>{{ menu }}</v-btn>
									</v-list-item>
								</v-list>
							</v-menu>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { AnswerInfo, LikeInfo, User } from '@/interfaces';
import { ActionTypes } from '@/store/actions';
import { remove } from 'lodash-es';
import Vue, { PropType } from 'vue';
import Avatar from './Avatar.vue';

export default Vue.extend({
	props: {
		item: {
			type: Object as PropType<AnswerInfo>
		},
		reply: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			privateMenu: ['수정', '삭제']
		};
	},
	computed: {
		user(): User {
			return this.$store.getters.getUser;
		},
		sync_reply: {
			get() {
				return this.reply;
			},
			set(value) {
				this.$emit('update:reply', value);
			}
		},
		isModifyReply(): boolean {
			return this.$store.getters.isModifyReply;
		}
	},
	methods: {
		goDetail(id: number) {
			console.log(id);
		},
		likeIcon(is_like: boolean) {
			return is_like ? 'mdi-heart' : 'mdi-heart-outline';
		},
		likeColor(is_like: boolean) {
			return is_like ? 'error' : 'grey';
		},
		hasReaction(item: AnswerInfo) {
			return item.like_count > 0 || item.comment_count > 0;
		},
		handleLike(item: AnswerInfo) {
			if (item.is_like) {
				this.$gtm.trackEvent({
					event: 'clickLike',
					user_uid: this.user.uid,
					user_email: this.user.email,
					check_in_id: this.item.id
				});

				const myLike = item.like.find(
					(likeItem: { user_id: number }) => likeItem.user_id === this.user.id
				);
				if (myLike) {
					this.deleteLike(myLike);
				}
			} else {
				this.postLike(item.id);
			}
		},
		async postLike(id: number) {
			try {
				const { data, status } = await this.$store
					.dispatch(ActionTypes.POST_LIKE, id)
					.then(response => {
						return response;
					});

				if (status === 200) {
					this.item.like.push({
						id: data.like_id,
						user_id: this.user.id
					});
					this.item.like_count += 1;
					this.item.is_like = true;
					this.$forceUpdate();
				}
			} catch (e) {
				console.log(e);
			}
		},
		async deleteLike(item: LikeInfo) {
			const { status } = await this.$store
				.dispatch(ActionTypes.DELETE_LIKE, item.id)
				.then(response => {
					return response;
				});

			if (status === 204) {
				remove(this.item.like, (like: { id: number }) => {
					return like.id === item.id;
				});
				this.item.like_count -= 1;
				this.item.is_like = false;
				this.$forceUpdate();
			}
		},
		isMyContent(user_id: number) {
			return user_id === this.user.id;
		},
		async handleMyAnswer(menu: string, id: number) {
			if (menu === '수정') {
				await this.$router.push(`/write/${id}`);
			}
			if (menu === '삭제') {
				const confirm = await this.$dialog.confirm({
					text: '정말 삭제하실 건가요?'
				});
				if (confirm) {
					this.$emit('deleteAnswer', id);
				}
			}
		},
		async handleMyReply(menu: string, id: number) {
			if (menu === '수정') {
				this.$emit('setReply', this.item.id, id);
			}
			if (menu === '삭제') {
				const confirm = await this.$dialog.confirm({
					text: '정말 삭제하실 건가요?'
				});
				if (confirm) {
					this.$emit('deleteReply', this.item.id, id);
				}
			}
		},
		handleReply(id: number) {
			const hasComment =
				this.item.comment instanceof Array && this.item.comment.length > 0;

			if (hasComment) {
				this.hideReply(id);
			} else {
				this.showReply(id);
			}
		},
		hideReply(id: number) {
			this.$emit('hideReply', id);
		},
		showReply(id: number) {
			this.$emit('showReply', id);
		},
		setReplyFocus() {
			const $textarea = this.$refs[
				`textarea-${this.item.id}`
			] as HTMLDivElement;
			$textarea.focus();
		},
		handleReplySubmit() {
			this.$emit(
				`${this.isModifyReply ? 'updateReply' : 'postReply'}`,
				this.item.id,
				this.reply
			);
		},
		updateInput(event: { target: { value: string } }) {
			this.$emit('input', event.target.value);
		},
		commentStyle(user_id: number) {
			return `max-width: calc(100% - ${
				this.isMyContent(user_id) ? '26px' : '10px'
			})`;
		}
	},
	components: {
		Avatar
	}
});
</script>

<style lang="scss" scoped>
@import '../assets/styles/quill.init.scss';

.v-card {
	border-radius: 8px;
}
.card-content::v-deep {
	padding: 8px 0 !important;

	p {
		margin-bottom: 0 !important;

		img {
			max-width: 100%;
		}
	}
}
</style>
