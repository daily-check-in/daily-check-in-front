<template>
	<v-container class="py-0 fill-height">
		<router-link to="/">
			<img src="../../assets/images/twitter_header_photo_1.png" class="logo" />
		</router-link>

		<v-spacer />

		<!-- <v-responsive max-width="260">
			<v-text-field
				prepend-inner-icon="mdi-magnify"
				filled
				rounded
				dense
				hide-details
				color="grey"
			/>
		</v-responsive> -->
	</v-container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'DesktopHeader'
});
</script>

<style lang="scss" scoped>
.logo {
	height: 42px;
	cursor: pointer;
}
</style>
