import { StateCreator } from 'zustand';
import { HashFormat } from '../../types';
import { resetters } from '..';

export interface HashSlice {
	hash: HashFormat;
	setHash: (hash: HashFormat) => void;
}

const initialHash = {
	hash: {
		address: '',
		tokenId: '',
		chainId: '',
		dataKey: '',
	},
};

export const createHashSlice: StateCreator<HashSlice, [], [], HashSlice> = (
	set
) => {
	resetters.push(() => set(initialHash));

	return {
		...initialHash,
		setHash: (hash: HashFormat) => {
			set({ hash });
		},
	};
};
