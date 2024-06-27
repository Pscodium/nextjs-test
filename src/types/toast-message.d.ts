export interface IToastMessage {
	id?: number;
	message: string;
	type: 'success' | 'error';
	duration?: number;
}
