<template>
	<div>
		<!-- 로그인 -->
		<v-btn @click="signInWithGoogle">로그인</v-btn>
		<v-btn @click="logout">로그아웃</v-btn>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';

export default Vue.extend({
	name: 'SignIn',
	methods: {
		signInWithGoogle() {
			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().languageCode = 'korean';
			firebase.auth().signInWithRedirect(provider);
		},
		logout() {
			firebase.auth().signOut();
		}
	}
});
</script>

<style scoped></style>
