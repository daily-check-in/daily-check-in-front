<template>
	<quill-editor
		ref="myQuillEditor"
		v-model="sync_content"
		:options="editorOption"
	/>
</template>

<script lang="ts">
import Vue from 'vue';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import '@/assets/styles/quill.init.scss';
import { quillEditor } from 'vue-quill-editor';

export default Vue.extend({
	props: {
		content: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: '느낀 점과 배운 점, 팀에 공유하고 싶은 말이 있으면 알려주세요.'
		}
	},
	computed: {
		editorOption() {
			const toolbarOption = [
				[{ header: [1, 2, 3, false, 5, 6] }],
				['bold', 'italic', 'underline'],
				[{ align: '' }, { align: 'center' }, { align: 'right' }],
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ color: [] }, { background: [] }],
				['link', 'video']
			];

			const editorOption = {
				modules: {
					toolbar: toolbarOption
				},
				placeholder: this.placeholder
			};

			return editorOption;
		},
		sync_content: {
			cache: false,
			get(): string {
				return this.content;
			},
			set(val: string): void {
				this.$emit('update:content', val);
			}
		}
	},
	components: {
		quillEditor
	}
});
</script>

<style lang="scss" scoped></style>
