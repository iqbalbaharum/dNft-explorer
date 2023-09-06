import { useState } from 'react'
import { formatDataKey, updateURL } from '../utils/utils.functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useBoundStore } from '../store'
import { useRepositories } from '../repositories'

export const SearchBar = () => {
  const { setHash, resetHistory } = useBoundStore(state => state)
  const { useGetMetadatasWithHistory } = useRepositories()
  const { refetch } = useGetMetadatasWithHistory()

  const [search, setSearch] = useState({
    token_address: '',
    token_id: '',
    chain_id: 1,
  })

  const onSearchClick = async (e: any) => {
    e.preventDefault()

    const args = {
      token_address: search.token_address.toLowerCase(),
      token_id: search.token_id,
      chain_id: String(search.chain_id),
    }

    const dataKey = formatDataKey(args.chain_id, args.token_address, args.token_id)

    let hash = { ...args, dataKey }

    resetHistory()
    setHash(hash)
    refetch()

    const { token_address, token_id, chain_id } = hash
    const newPath = `${token_address}/${token_id}/${chain_id}`
    updateURL(newPath)
  }

  const onHandleChange = (event: any) => {
    setSearch({
      ...search,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <section className="w-3/4 p-5">
      <h1 className="text-xl text-left font-semibold mb-3 text-white">The Lineage Metadata Explorer</h1>
      <div className="flex gap-2 rounded w-full items-center col-span-2">
        <div className="w-2/4">
          <label className="text-white" htmlFor="token_address">
            Token Address
          </label>
          <input
            type="text"
            className="w-full bg-white pl-2 border border-blue-500 rounded-lg py-3 mr-2 focus:border-[#747FEB] transition-all duration-300 focus:pl-4"
            placeholder="Token Address"
            name="token_address"
            value={search.token_address}
            onChange={onHandleChange}
          />
        </div>

        <div className="w-1/4 flex flex-col">
          <label className="text-white" htmlFor="token_address">
            Token ID
          </label>
          <input
            type="text"
            className="bg-white pl-2 border border-1 rounded-lg border-blue-500  py-3 mr-2 focus:border-[#747FEB] transition-all duration-300 focus:pl-4"
            placeholder="Token ID"
            name="token_id"
            value={search.token_id}
            onChange={onHandleChange}
          />
        </div>

        <div className="w-1/4 flex flex-col">
          <label className="text-white" htmlFor="chain_id">
            Chain ID
          </label>
          <input
            type="text"
            className="bg-white pl-2 border border-1 rounded-lg border-blue-500  py-3 mr-2 focus:border-[#747FEB] transition-all duration-300 focus:pl-4"
            placeholder="Chain ID"
            name="chain_id"
            value={search.chain_id}
            onChange={onHandleChange}
          />
        </div>

        <button
          className="place-self-end mb-2 bg-[#747FEB] px-3 py-2 rounded text-white font-bold hover:bg-blue-800 transition-colors"
          onClick={onSearchClick}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </section>
  )
}
