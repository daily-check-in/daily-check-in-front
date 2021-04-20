<template>
	<div class="avatar-wrapper">
		<!-- :class="{ 'align-self-start': space === 'comment' }" -->
		<template v-if="checkInKings.some(king => king === displayName)">
			<img
				class="icon-crown"
				src="@/assets/images/icon/icon_crown.svg"
				alt=""
			/>
		</template>
		<v-list-item-avatar color="white" class="ma-0">
			<v-img alt :src="photoUrl" />
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

	.icon-crown {
		position: absolute;
		width: 20px;
		z-index: 1;
		transform: rotate(-50deg);
		left: -11px;
		top: -9px;
	}
}
</style>
