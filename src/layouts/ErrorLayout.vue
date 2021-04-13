<template>
	<v-app id="inspire">
		<v-main>
			<v-container>
				<slot />
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'ErrorLayout'
});
</script>

<style lang="scss" scoped></style>
