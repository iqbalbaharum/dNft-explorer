import { create } from 'zustand';
import { HashSlice, createHashSlice } from './slices/search.slice';
import { HistorySlice, createHistorySlice } from './slices/history.slice';

type ResetAllSlices = { resetAllSlices: () => void };
type BoundStoreType = HashSlice & HistorySlice & ResetAllSlices;

export const resetters: (() => void)[] = [];

export const useBoundStore = create<BoundStoreType>()((...a) => ({
	...createHashSlice(...a),
	...createHistorySlice(...a),

	resetAllSlices: () => resetters.forEach((resetter) => resetter()),
}));
