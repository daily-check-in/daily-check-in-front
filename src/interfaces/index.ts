export interface Answer {
	comment_count: number;
	content: string;
	created_at: string;
	emotion: object;
	emotion_id: number;
	id: number;
	is_like: boolean;
	like: Array<object>;
	like_count: number;
	updated_at: string;
	user: User;
	user_id: number;
}

export interface User {
	id: number;
	display_name: string;
	email: string;
	photoURL: string;
	uid?: string;
	created_at?: string;
	updated_at?: string;
}
