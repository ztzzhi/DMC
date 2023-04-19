import { useEffect, useState } from "react"
import { getSeleData } from "@/api/index"
const useGetSeleData = () => {
  const [data, setData] = useState<Record<string, any>>()
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const res = await getSeleData()

    res?.code === 200 && setData(res?.data)
  }
  return data
}

export default useGetSeleData
