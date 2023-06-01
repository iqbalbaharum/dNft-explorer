import axios from 'axios';
import { FdbDht } from '../types';

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

export const getMetadatasWithHistory = async (dataKey: string) => {
	try {
		const res = await getMetadatas(dataKey);
		let metadatas = res?.result?.metadatas as FdbDht[];

		const promises = metadatas.map(async (metadata: FdbDht) => {
			let response = await getMetadataWithHistory({
				dataKey: metadata.data_key,
				publicKey: metadata.public_key,
				alias: metadata.alias,
			});

			const { result } = response;

			if (metadata.alias.length <= 0)
				metadata.alias = `beat_${metadata.cid.slice(-4)}`;

			let metadataIncluded = {
				...metadata,
				metadata: {
					...result,
					metadata: JSON.parse(result.metadata),
					history: result.history.map((el: any) => JSON.parse(el)),
				},
			};

			return metadataIncluded;
		});

		metadatas = await Promise.all(promises);
		return metadatas;
	} catch (e) {
		return [];
	}
};
