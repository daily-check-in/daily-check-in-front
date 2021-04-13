<template>
	<div id="app">
		<BaseLayout>
			<router-view />
		</BaseLayout>

		<LoadingOverlay />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import BaseLayout from './layouts/BaseLayout.vue';

export default Vue.extend({
	name: 'App',
	components: { BaseLayout, LoadingOverlay }
});
</script>

<style lang="scss"></style>
