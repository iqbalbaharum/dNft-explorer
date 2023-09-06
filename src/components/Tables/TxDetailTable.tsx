import { capitalizeWords, formatTimestamp, isJSONObject, isUrl } from '../../utils/utils.functions'
import { Badge } from '../Badge'
import { ExternalURL } from '../ExternalURL'
import { PrettyJSON } from '../PrettyJSON'

type TxDetail = { label: string[]; data: { [key: string]: any } }

export const TxDetailTable = ({ label, data }: TxDetail) => {
  const renderValue = (key: string, data: any) => {
    switch (key) {
      case 'timestamp':
        return formatTimestamp(data)
      case 'method':
        return (
          <Badge
            text={capitalizeWords(data)}
            className="bg-[#F8F9FA] text-black text-xs font-medium px-4 py-1 rounded shadow-sm w-20 overflow-hidden text-ellipsis"
          />
        )
      case 'data':
        return (
          <span>
            {isUrl(data) ? (
              <ExternalURL url={data} />
            ) : isJSONObject(data) ? (
              <PrettyJSON data={JSON.parse(data)} />
            ) : (
              data
            )}
          </span>
        )

      default:
        return data
    }
  }

  return (
    <table className="divide-y divide-gray-200 table-auto border-none text-sm whitespace-nowrap text-gray-900">
      <tbody className="divide-y divide-gray-200">
        {label.map((key: string, index: number) => {
          return (
            <tr key={index}>
              <td className="p-3.5">{capitalizeWords(key)}</td>
              <td className="p-3.5">{renderValue(key, data[key])}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
