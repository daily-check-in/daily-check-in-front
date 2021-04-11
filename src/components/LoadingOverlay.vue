<template>
	<v-overlay :value="isLoading">
		<v-progress-circular indeterminate color="green" :size="70" :width="7" />
	</v-overlay>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	computed: {
		isLoading() {
			return this.$store.state.isLoading;
		}
	}
});
</script>

<style></style>
