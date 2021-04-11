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
				class="mb-6"
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

export default Vue.extend({
	name: 'Home',
	data() {
		return {
			infiniteId: +new Date()
		};
	},
	computed: {
		user(): any {
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
			const userName = this.user.displayName;
			const textItems = [
				', 오늘 하루는 어떠셨나요?',
				'의 하루가 궁금해요!',
				', 고민거리 있으세요?'
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
						if (data.length > 0) {
							this.$store.commit(MutationTypes.SET_PAGE, this.page + 1);
							this.$store.commit(MutationTypes.SET_ANSWER, [
								...this.answerItems,
								...data
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
		}
	},
	components: { Card }
});
</script>
