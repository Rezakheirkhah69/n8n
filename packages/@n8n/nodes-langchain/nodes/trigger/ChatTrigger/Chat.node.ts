/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
import { NodeConnectionTypes, WAIT_INDEFINITELY } from 'n8n-workflow';
import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeTypeDescription,
	INodeType,
} from 'n8n-workflow';

export class Chat implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Respond to Chat and Wait for Response',
		name: 'chat',
		icon: 'fa:comments',
		iconColor: 'black',
		group: ['input'],
		version: 1,
		description: 'Respond to Chat and Wait for Response',
		defaults: {
			name: 'Respond to Chat and Wait for Response',
		},
		codex: {
			categories: ['Core Nodes'],
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chat/',
					},
				],
			},
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		properties: [
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				required: true,
				typeOptions: {
					rows: 6,
				},
			},
		],
	};

	async onMessage(
		_context: IExecuteFunctions,
		data: INodeExecutionData,
	): Promise<INodeExecutionData[][]> {
		return [[data]];
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const message = this.getNodeParameter('message', 0) as string;

		await this.putExecutionToWait(WAIT_INDEFINITELY);
		return [[{ json: {}, sendMessage: message }]];
	}
}
