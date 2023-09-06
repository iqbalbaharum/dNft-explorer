import axios from 'axios'
import { Metadata, Transaction } from '../types'

const jsonrpc = axios.create({
  baseURL: process.env.REACT_APP_JSON_RPC_URL,
  timeout: 5000,
})

type RPCResponse<T> = {
  id: string
  jsonrpc: '2.0'
  result: {
    err_msg: string
    success: boolean
  } & T
}
export type JSONRPCFilter<C> = {
  query?: Array<{ column: keyof C; op: '='; query: string }>
  ordering?: Array<{ column: keyof C; sort: 'desc' | 'asc' }>
  from: number
  to: number
}
export const getMetadatas = async (data_key: string, version: string) => {
  const { data } = await jsonrpc({
    method: 'post',
    data: {
      jsonrpc: '2.0',
      method: 'get_metadatas',
      params: [data_key, version],
      id: 'string',
    },
  })
  return data as RPCResponse<{ metadatas: Metadata[] }>
}

export const getMetadataWithHistory = async (args: {
  data_key: string
  meta_contract_id: string
  public_key: string
  alias: string
  version: string
}) => {
  const { data } = await jsonrpc({
    method: 'post',
    data: {
      jsonrpc: '2.0',
      method: 'get_metadata_with_history',
      params: [args.data_key, args.meta_contract_id, args.public_key, args.alias, args.version],
      id: 'string',
    },
  })
  return data as RPCResponse<{ metadata: string; history: [] }>
}

export const getNodeClock = async () => {
  const { data } = await jsonrpc({
    method: 'post',
    data: {
      jsonrpc: '2.0',
      method: 'get_node_clock',
      id: 'string',
    },
  })
  return data as RPCResponse<{ timestamp: number }>
}

export const getTransactions = async (args: JSONRPCFilter<Transaction>) => {
  const { data } = await jsonrpc({
    method: 'post',
    data: {
      jsonrpc: '2.0',
      method: 'get_transactions',
      params: args,
      id: 'string',
    },
  })

  return data as RPCResponse<{ transactions: Transaction[] }>
}

export const getTransaction = async (hash: string) => {
  const { data } = await jsonrpc({
    method: 'post',
    data: {
      jsonrpc: '2.0',
      method: 'get_transaction',
      params: [hash],
      id: 'string',
    },
  })

  return data as RPCResponse<{ transaction: Transaction }>
}
