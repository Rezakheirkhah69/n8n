import type { Request } from 'express';
import type { WebSocket } from 'ws';

export type ChatRequest = Request<
	{ workflowId: string },
	{},
	{},
	{ sessionId: string; executionId?: string; isPublic?: boolean }
> & {
	ws: WebSocket;
};

export type Session = {
	connection: WebSocket;
	executionId?: string;
	intervalId?: NodeJS.Timeout;
	nodeWaitingForResponse: string | null;
	isPublic?: boolean;
};

export type ChatMessage = {
	sessionId: string;
	action: string;
	chatInput: string;
	files?: Array<{
		name: string;
		type: string;
		data: string;
	}>;
};
