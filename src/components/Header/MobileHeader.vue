<template>
	<v-container class="pa-0 fill-height">
		<v-app-bar-nav-icon
			v-if="$route.meta.detail"
			color="white"
			@click="$router.go(-1)"
		>
			<v-icon>mdi-arrow-left</v-icon>
		</v-app-bar-nav-icon>
		<v-spacer />
		<v-btn v-if="isWritePage" text color="white" @click="postAnswer()">
			작성완료
		</v-btn>
	</v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import eventBus from '../../utils/bus';

export default Vue.extend({
	computed: {
		isWritePage() {
			return this.$route.name === 'Write';
		}
	},
	methods: {
		postAnswer() {
			eventBus.$emit('postAnswer');
		}
	}
});
</script>

<style lang="scss" scoped></style>
