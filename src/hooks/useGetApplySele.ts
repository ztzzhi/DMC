import { useEffect, useState } from "react"
import { listApp } from "@/api"
const useGetApplySele = () => {
  const [data, setData] = useState<Record<string, any>>()
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    listApp({ page: 1, limit: 10000 }).then(r => {
      if (r.code === 200) {
        setData(
          r?.data?.lists?.map((item: any) => ({
            ...item,
            value: item.client_id,
            label: item.client_desc + "-" + item.client_id
          }))
        )
      }
    })
  }
  return data
}

export default useGetApplySele
