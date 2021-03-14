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
	user: Record<string, any>;
	user_id: number;
}

export interface User {
	displayName: string;
	email: string;
	phoneNumber: string;
	photoURL: string;
	providerId: string;
	uid: string;
}
