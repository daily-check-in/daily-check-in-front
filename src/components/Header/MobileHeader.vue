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
		<v-btn v-if="$_isWritePage" text color="white" @click="postAnswer()">
			{{ $_writeButtonName }}
		</v-btn>
	</v-container>
</template>

<script lang="ts">
import eventBus from '../../utils/bus';
import writeMixin from '../../mixins/writeMixin';

export default writeMixin.extend({
	computed: {},
	methods: {
		postAnswer() {
			eventBus.$emit('submitAnswer', this.$_isModify);
		}
	}
});
</script>

<style lang="scss" scoped></style>
