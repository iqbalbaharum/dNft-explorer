import { StateCreator } from 'zustand'
import { HashFormat } from '../../types'

export interface HashSlice {
  hash: HashFormat
  setHash: (hash: HashFormat) => void
}

export const createHashSlice: StateCreator<HashSlice, [], [], HashSlice> = set => ({
  hash: {
    token_address: '',
    token_id: '',
    chain_id: '',
    dataKey: '',
  },
  setHash: (hash: HashFormat) => {
    set({ hash })
  },
})
