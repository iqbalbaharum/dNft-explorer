import { useEffect } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRepositories } from '../repositories';
import { useParams } from 'react-router-dom';

import { TxDetailTable } from '../components';
import { Transactions } from '../types';

dayjs.extend(relativeTime);

export const TransactionDetails = () => {
	const { hash } = useParams();
	const { useGetTransaction } = useRepositories();
	const { data: tx, refetch, isLoading } = useGetTransaction(String(hash));

	const COMMON_LABELS = [
		'hash',
		'method',
		'status',
		'timestamp',
		'data',
		'public_key',
		'host_id',
		'from_peer_id',
		'nonce',
	];

	const METHOD_METADATA = ['token_id', 'token_key', 'data_key'];
	const METHOD_CONTRACT = ['token_key', 'meta_contract_id'];

	const labels: { [key: string]: string[] } = {
		metadata: COMMON_LABELS.concat(METHOD_METADATA),
		contract: COMMON_LABELS.concat(METHOD_CONTRACT),
		cron: COMMON_LABELS,
	};

	useEffect(() => {
		const hashExists = hash?.length;
		if (hashExists) refetch();
	}, []);

	return (
		<>
			<section className="flex items-center justify-center pb-5 mx-5 md:mx-0">
				<div className="w-full relative block border border-gray-100 p-2 shadow-sm text-left">
					<div className="mt-1 mb-4 sm:items-center sm:justify-between text-left ">
						<div className="text-sm text-gray-600">Transaction Details</div>

						{!isLoading && (
							<TxDetailTable
								label={labels[(tx as Transactions).method]}
								data={tx as Transactions}
							/>
						)}
					</div>
				</div>
			</section>
		</>
	);
};
