<template>
	<v-app id="inspire">
		<Header v-if="isShowHeader" />

		<v-main class="grey lighten-3">
			<v-container>
				<v-row justify="center">
					<v-col v-if="!this.$vuetify.breakpoint.mobile" cols="4">
						<v-sheet rounded="lg">
							<v-list color="transparent">
								<v-list-item>
									<Avatar
										:photo-url="user.photoURL"
										:display-name="user.display_name"
										class="mr-2"
									/>
									<v-list-item-content>
										<v-list-item-title class="font-weight-medium">
											{{ user.display_name }}
										</v-list-item-title>
										<v-list-item-title class="grey--text">
											{{ user.email }}
										</v-list-item-title>
									</v-list-item-content>
								</v-list-item>

								<v-divider class="my-2"></v-divider>

								<v-list-item link color="grey lighten-4">
									<v-list-item-content>
										<v-list-item-title @click="logout()">
											로그아웃
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
import firebase from 'firebase';
import Header from './Header.vue';
import { UserInfo } from '@/interfaces/index';
import Avatar from '@/components/Avatar.vue';

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
		},
		user(): UserInfo {
			return this.$store.getters.getUser;
		}
	},
	methods: {
		logout() {
			this.$gtm.trackEvent({
				event: 'clickLogout',
				user_uid: this.user.uid,
				user_email: this.user.email
			});

			firebase.auth().signOut();
			this.$router.replace('/signin');
		}
	},
	components: { Header, Avatar }
});
</script>

<style></style>
