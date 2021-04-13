<template>
	<component :is="layout">
		<slot />
	</component>
</template>

<script lang="ts">
import Vue from 'vue';

const defaultLayout = 'DefaultLayout';

export default Vue.extend({
	name: 'BaseLayout',
	computed: {
		layout() {
			const layout = this.$route.meta.layout || defaultLayout;
			return () => import(`@/layouts/${layout}.vue`);
		}
	}
});
</script>

<style></style>
