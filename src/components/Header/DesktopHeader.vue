<template>
	<v-container class="py-0 fill-height">
		<v-avatar class="mr-10" color="teal" size="32">
			<span class="white--text">데체</span>
		</v-avatar>

		<v-btn v-for="link in links" :key="link.name" text>
			<router-link :to="link.to">{{ link.name }}</router-link>
		</v-btn>

		<v-spacer />

		<v-responsive max-width="260">
			<v-text-field
				prepend-inner-icon="mdi-magnify"
				filled
				rounded
				dense
				hide-details
				color="grey"
			/>
		</v-responsive>
	</v-container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		links: {
			type: Array
		}
	}
});
</script>

<style lang="scss" scoped></style>
