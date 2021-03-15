<template>
	<v-card>
		<v-list-item class="grow pt-2">
			<v-list-item-avatar color="grey darken-3 mr-2">
				<v-img alt :src="item.user.photoURL" />
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title>{{ item.user.display_name }}</v-list-item-title>
				<v-list-item-subtitle class="grey--text">
					{{ item.created_at }}
				</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-card-text class="py-2">
			<v-alert class="mb-3 pa-2 pt-1 pb-0 d-inline-flex" color="grey lighten-3">
				<div class="d-flex flex-row align-center">
					<div class="headline mr-2">
						{{ item.emotion.emoji }}
					</div>
					<div
						class="black--text subtitle-2"
						v-html="`${item.user.display_name}님은 ${item.emotion.answer}`"
					/>
				</div>
			</v-alert>

			<div class="py-2 card-content black--text" v-html="item.content" />

			<div
				v-show="hasReaction(item)"
				class="mt-2 d-flex align-center justify-space-between"
			>
				<div v-show="item.like_count > 0" class="flex align-center">
					<v-icon small color="error" class="mr-1">
						mdi-heart
					</v-icon>
					<span class="subheading mr-2">{{ item.like_count }}</span>
				</div>
				<div v-show="item.comment_count > 0">
					댓글
					{{ item.comment_count }}개
				</div>
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
						<v-btn text block color="grey" @click="goDetail(item.id)">
							<v-icon small class="mr-1">mdi-comment-outline</v-icon>
							<span class="subheading">댓글 달기</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-list-item>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { Answer, Like } from '@/interfaces';
import { ActionTypes } from '@/store/actions';
import { remove } from 'lodash-es';
import Vue, { PropType } from 'vue';

export default Vue.extend({
	props: {
		item: Object as PropType<Answer>
	},
	computed: {
		user(): any {
			return this.$store.getters.getUser;
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
		hasReaction(item: Answer) {
			return item.like_count > 0 || item.comment_count > 0;
		},
		handleLike(item: Answer) {
			if (item.is_like) {
				console.log(item.like);
				const myLike = item.like.find(
					(likeItem: Record<string, any>) => likeItem.user_id === this.user.id
				);
				this.deleteLike(myLike);
			} else {
				this.postLike(item.id);
			}
		},
		async postLike(id: number) {
			const response = await this.$store
				.dispatch(ActionTypes.POST_LIKE, id)
				.then(response => {
					return response;
				});
			this.item.like.push({
				id: response.like_id,
				user_id: this.user.id
			});
			this.item.like_count += 1;
			this.item.is_like = true;
		},
		deleteLike(item: Like) {
			this.$store.dispatch(ActionTypes.DELETE_LIKE, item.id).then(() => {
				remove(this.item.like, like => {
					return like.id === item.id;
				});
				this.item.like_count -= 1;
				this.item.is_like = false;
			});
		}
	}
});
</script>

<style lang="scss" scoped>
.v-card {
	border-radius: 8px;
}
</style>
