import axios from 'axios';

const jsonrpc = axios.create({
	baseURL: process.env.REACT_APP_JSON_RPC_URL,
	timeout: 5000,
});

export type JSONRPCResponse = {
	id: string;
	jsonrpc: string;
	result: any;
};

export const getMetadatas = async (dataKey: string) => {
	const { data } = await jsonrpc({
		method: 'post',
		data: {
			jsonrpc: '2.0',
			method: 'get_metadatas',
			params: [dataKey],
			id: 'string',
		},
	});
	return data as JSONRPCResponse;
};

export const getMetadataWithHistory = async (args: {
	dataKey: string;
	publicKey: string;
	alias: string;
}) => {
	console.log(args);
	const { data } = await jsonrpc({
		method: 'post',
		data: {
			jsonrpc: '2.0',
			method: 'get_metadata_with_history',
			params: [args.dataKey, args.publicKey, args.alias],
			id: 'string',
		},
	});
	return data as JSONRPCResponse;
};
