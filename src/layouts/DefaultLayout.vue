<template>
	<v-app id="inspire">
		<Header v-if="isShowHeader" />

		<v-main class="grey lighten-3">
			<v-container>
				<v-row justify="center">
					<v-col v-if="!this.$vuetify.breakpoint.mobile" cols="4">
						<v-sheet rounded="lg">
							<v-list color="transparent">
								<v-list-item v-for="n in 5" :key="n" link>
									<v-list-item-content>
										<v-list-item-title> List Item {{ n }} </v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider class="my-2"></v-divider>

								<v-list-item link color="grey lighten-4">
									<v-list-item-content>
										<v-list-item-title>
											Refresh
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-sheet>
					</v-col>

					<v-col :cols="computedContainerCols">
						<slot />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './Header.vue';

export default Vue.extend({
	name: 'DefaultLayout',
	computed: {
		isShowHeader(): boolean {
			if (this.$vuetify.breakpoint.mobile) {
				return this.$route.meta.detail;
			} else {
				return true;
			}
		},
		computedContainerCols() {
			return this.$vuetify.breakpoint.mobile ? 12 : 8;
		}
	},
	components: { Header }
});
</script>

<style></style>
