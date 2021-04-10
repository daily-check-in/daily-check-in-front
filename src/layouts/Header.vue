<template>
	<v-app-bar app :color="appBarColor" flat dense>
		<MobileHeader v-if="this.$vuetify.breakpoint.mobile" />
		<DesktopHeader v-else :links="links" />
	</v-app-bar>
</template>

<script lang="ts">
import DesktopHeader from '@/components/Header/DesktopHeader.vue';
import MobileHeader from '@/components/Header/MobileHeader.vue';
import Vue from 'vue';

export default Vue.extend({
	data() {
		return {
			links: [
				{
					name: 'Home',
					to: '/'
				},
				{
					name: 'About',
					to: '/about'
				}
			]
		};
	},
	computed: {
		appBarColor() {
			return this.$vuetify.breakpoint.mobile ? 'success' : 'white';
		}
	},
	components: { DesktopHeader, MobileHeader }
});
</script>

<style lang="scss" scoped></style>
