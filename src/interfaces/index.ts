export interface AnswerInfo {
	comment_count: number;
	content: string;
	created_at: string;
	emotion: object;
	emotion_id: number;
	id: number;
	is_like: boolean;
	like: LikeResponse;
	like_count: number;
	updated_at: string;
	user: User;
	user_id: number;
	comment?: CommentInfo;
}

export type AnswerResponse = AnswerInfo[];

export interface User {
	id: number;
	display_name: string;
	email: string;
	photoURL: string;
	uid?: string;
	created_at?: string;
	updated_at?: string;
}

export interface LikeInfo {
	answer_id?: number;
	created_at?: string;
	id: number;
	user_id: number;
	user?: User;
}

export type LikeResponse = LikeInfo[];

export interface EmotionInfo {
	answer: string;
	comment: string;
	created_at: string;
	emoji: string;
	id: number;
	name: string;
	uid: string;
	updated_at: string;
	value: number;
}

export type EmotionResponse = EmotionInfo[];

interface CommentInfo {
	answer_id: number;
	content: string;
	created_at: string;
	id: number;
	updated_at: string;
	user: User;
	user_id: number;
}

export type CommentResponse = CommentInfo[];
