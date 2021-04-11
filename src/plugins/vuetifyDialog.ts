import Vue from 'vue';
import vuetify from './vuetify';
import VuetifyDialog from 'vuetify-dialog';
import 'vuetify-dialog/dist/vuetify-dialog.min.css';

Vue.use(VuetifyDialog, {
	context: {
		vuetify
	},
	confirm: {
		actions: {
			false: '취소',
			true: {
				text: '확인',
				color: 'success'
			}
		}
	}
});
