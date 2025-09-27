import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PushbellApi implements ICredentialType {
	name = 'pushbellApi';

	displayName = 'PushBell API';

	icon: Icon = { light: 'file:../icons/Icon-iOS-Default.png', dark: 'file:../icons/Icon-iOS-Dark.png' };

	documentationUrl =
		'https://pushbell.info/integrationsapi';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
                Authorization: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://www.pushbell.info/api',
			url: '/createNotification',
			method: 'POST',
            body: {
                title: 'n8n test',
                description: 'Testing credentials',
            }
		},
	};
}
