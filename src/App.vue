<template>
	<div id="app">
		<v-app id="inspire" v-resize="onResize">
			<Header v-if="isPc" />

			<v-main class="grey lighten-3">
				<v-container>
					<v-row justify="center">
						<v-col v-if="isPc" cols="4">
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
							<router-view />
						</v-col>
					</v-row>
				</v-container>
			</v-main>
		</v-app>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './layouts/Header.vue';
import { mapGetters, mapMutations } from 'vuex';

export default Vue.extend({
	computed: {
		...mapGetters(['isMobile', 'isTablet', 'isPc']),
		computedContainerCols() {
			if (this.isMobile) {
				return 12;
			} else if (this.isTablet) {
				return 11;
			} else {
				return 8;
			}
		}
	},
	mounted() {
		this.onResize();
	},
	methods: {
		...mapMutations(['setWindowWidth']),
		onResize() {
			this.setWindowWidth(window.innerWidth);
		}
	},
	components: { Header }
});
</script>

<style lang="scss">
@import 'assets/styles/common.scss';
</style>
