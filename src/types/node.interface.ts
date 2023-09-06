export interface Metadata {
  alias: string
  cid: string
  data_key: string
  hash: string
  loose: number
  meta_contract_id: string
  public_key: string
  token_id: string
  token_key: string
  version: string
}

export interface HashFormat {
  token_address: string
  token_id: string
  chain_id: string
  dataKey: string
}

export type Transaction = {
  alias: string
  chain_id: string
  data: string
  data_key: string
  hash: string
  mcdata: string
  meta_contract_id: string
  method: string
  public_key: string
  status: number
  timestamp: number
  token_address: string
  token_id: string
  token_key: string
  version: string
}
