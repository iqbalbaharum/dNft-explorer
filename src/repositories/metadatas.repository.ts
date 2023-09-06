import { useQuery } from '@tanstack/react-query'
import { RQ_KEY } from '.'
import { getMetadataWithHistory, getMetadatas } from '../services'
import { Metadata } from '../types'
import { useBoundStore } from '../store'

const getMetadatasWithHistory = async (dataKey: string, version = '1') => {
  try {
    const res = await getMetadatas(dataKey, version)
    let metadatas = res?.result?.metadatas as Metadata[]

    const promises = metadatas.map(async (metadata: Metadata) => {
      let response = await getMetadataWithHistory({
        data_key: metadata.data_key,
        meta_contract_id: metadata.meta_contract_id,
        public_key: metadata.public_key,
        alias: metadata.alias,
        version: '',
      })

      const { result } = response

      const haveNoAlias = metadata.alias.length <= 0
      if (haveNoAlias) metadata.alias = ``

      let updatedMetadata = {
        ...metadata,
        metadata: {
          ...result,
          metadata: JSON.parse(result.metadata),
          history: result.history.map((el: any) => JSON.parse(el)),
        },
      }

      return updatedMetadata
    })

    metadatas = await Promise.all(promises)

    return metadatas
  } catch (e) {
    return []
  }
}

const useGetMetadatasWithHistory = () => {
  const { dataKey } = useBoundStore(state => state.hash)

  return useQuery({
    queryKey: [RQ_KEY.GET_METADATAS_WITH_HISTORY, dataKey],
    queryFn: () => getMetadatasWithHistory(dataKey),
    enabled: Boolean(dataKey),
  })
}

export const MetadataRepository = { useGetMetadatasWithHistory }
