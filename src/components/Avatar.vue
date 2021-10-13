<template>
	<div class="avatar-wrapper">
		<template v-if="checkInKings.some(king => king === displayName)">
			<img src="@/assets/images/icon/crown.gif" class="dc-king-crown" alt />
		</template>
		<v-list-item-avatar color="white" class="ma-0">
			<v-img alt :src="photoUrl" referrerpolicy="no-referer" />
		</v-list-item-avatar>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		photoUrl: {
			type: String
		},
		displayName: {
			type: String
		}
	},
	data() {
		return {
			checkInKings: ['이민규', '유성실']
		};
	}
});
</script>

<style lang="scss" scoped>
.avatar-wrapper {
	position: relative;

	.dc-king-crown {
		position: absolute;
		width: 28px;
		z-index: 1;
		transform: rotate(-50deg);
		left: -12px;
		top: -10px;
	}
}
</style>
