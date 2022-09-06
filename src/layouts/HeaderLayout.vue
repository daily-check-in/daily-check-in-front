<template>
	<v-app-bar app :color="appBarColor" flat dense>
		<MobileHeader v-if="this.$vuetify.breakpoint.mobile" />
		<DesktopHeader v-else />
	</v-app-bar>
</template>

<script lang="ts">
import DesktopHeader from '@/components/Header/DesktopHeader.vue';
import MobileHeader from '@/components/Header/MobileHeader.vue';
import Vue from 'vue';

export default Vue.extend({
	name: 'HeaderLayout',
	computed: {
		appBarColor() {
			return this.$vuetify.breakpoint.mobile ? 'primary' : 'white';
		}
	},
	components: { DesktopHeader, MobileHeader }
});
</script>

<style lang="scss" scoped></style>
