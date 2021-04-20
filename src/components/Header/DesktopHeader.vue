<template>
	<v-container class="py-0 fill-height">
		<router-link
			to="/"
			class="logo-wrapper d-flex justify-center"
			style="text-decoration: none"
		>
			<img
				src="@/assets/images/logo/logo_comento_symbol.svg"
				alt
				class="logo mr-1"
			/>
			데일리 체크인
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
.logo-wrapper {
	color: #00c853;
	font-weight: bold;

	.logo {
		height: 18px;
	}
}
</style>
