import {IDataObject, IExecuteFunctions, IHttpRequestOptions, INodeExecutionData, INodeType, INodeTypeDescription} from "n8n-workflow";

export class Pushbell implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'PushBell',
        name: 'pushbell',
        icon: 'file:../../icons/github.svg',
        group: ['output'],
        version: 1,
        description: 'Send notifications via the PushBell API',
        defaults: {
            name: 'PushBell',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'pushbellApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Title',
                name: 'title',
                type: 'string',
                default: '',
                placeholder: 'My Notification',
                required: true,
            },
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                default: '',
                placeholder: 'Something happened...',
                required: true,
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const title = this.getNodeParameter('title', i) as string;
            const description = this.getNodeParameter('description', i) as string;

            const options: IHttpRequestOptions = {
                method: 'POST',
                url: 'https://www.pushbell.info/api/createNotification',
                body: {
                    title,
                    description,
                },
                json: true,
            };

            const response = await this.helpers.httpRequestWithAuthentication.call(
                this,
                'pushbellApi',
                options,
            );

            returnData.push({
                json: response as IDataObject,
            });
        }

        return [returnData];
    }
}
