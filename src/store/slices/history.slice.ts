import { StateCreator } from 'zustand';
import { resetters } from '..';

export interface HistorySlice {
	history: { alias: string; data: any[] };
	setHistory: (alias: string, history: any[]) => void;
}

const initialHistory = { history: { alias: '', data: [] } };

export const createHistorySlice: StateCreator<
	HistorySlice,
	[],
	[],
	HistorySlice
> = (set) => {
	resetters.push(() => set(initialHistory));

	return {
		...initialHistory,
		setHistory: (alias: string, history: any[]) => {
			set({ history: { alias, data: history } });
		},
	};
};
