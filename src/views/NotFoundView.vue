<template>
	<v-container>
		<v-row class="d-flex align-center">
			<v-col sm="6" offset-sm="3">
				<div class="d-flex flex-column pa-4">
					<img src="@/assets/images/404.svg" alt class="mb-10" />

					<v-btn to="/" outlined color="success">메인으로 돌아가기</v-btn>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.row {
	height: calc(100vh - 46px);
}
img {
	width: 100%;
}
</style>
