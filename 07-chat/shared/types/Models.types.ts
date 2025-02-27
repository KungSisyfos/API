export {}

export interface Room {
	id: string;
	name: string;
}

export interface User {
	id: string;				// socket.id
	username: string;
	roomId: string;
}

export interface Message {
	content: string;
	roomId: string;
	timestamp: number;
	username: string;
}
