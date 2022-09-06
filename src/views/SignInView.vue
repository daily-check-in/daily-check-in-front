<template>
	<section>
		<div class="bg-comento-team">
			<v-card class="pa-4 pt-6 pb-10">
				<div class="text-h3 font-weight-bold text-left mb-4">
					데일리 체크인
				</div>
				<div class="text-h6 text-left">
					오늘은 <strong>어떤 하루</strong>를 보내셨나요?<br />
					하루하루의 <strong>일과 고민, 감정을 나눠보세요.</strong>
				</div>
				<v-btn
					x-large
					color="primary"
					class="mt-4 float-right font-weight-bold"
					@click="signInWithGoogle"
				>
					하루 공유하기 >
				</v-btn>
			</v-card>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase/compat';

export default Vue.extend({
	name: 'SignInView',
	mounted() {
		this.$gtm.trackEvent({
			event: 'viewLogin',
			user_uid: 'none',
			user_email: 'none'
		});
	},
	methods: {
		signInWithGoogle() {
			this.$gtm.trackEvent({
				event: 'clickLogin'
			});

			const provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().languageCode = 'korean';
			firebase.auth().signInWithRedirect(provider);
		}
	}
});
</script>

<style lang="scss" scoped>
.bg-comento-team {
	width: 100vw;
	height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100vw;
	height: 100vh;
	background-position: center center;
	background-image: linear-gradient(
			0deg,
			rgba(38, 91, 98, 0.4) 0%,
			rgba(38, 91, 98, 0.4) 100%
		),
		url(https://comento-s3-bucket.s3.ap-northeast-2.amazonaws.com/comento/comento-people.jpg);

	.v-card {
		top: 50%;
		width: 600px;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(160, 164, 170, 0.65);
		color: white;
	}
}
</style>
