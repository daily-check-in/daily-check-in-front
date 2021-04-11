import Vue from 'vue';

export default Vue.extend({
	computed: {
		$_isWritePage(): boolean {
			return this.$route.name === 'Write';
		},
		$_hasId(): boolean {
			return typeof this.$route.params.id !== 'undefined';
		},
		$_isModify(): boolean {
			return this.$_isWritePage && this.$_hasId;
		},
		$_writeButtonName(): string {
			return `${this.$_isModify ? '수정' : '작성'}하기`;
		}
	},
	created() {
		console.log();
	}
});
