import { useEffect, useState } from "react"
import { getDeviceClass } from "@/api/devicelist"
const useGetAdressData = () => {
  const [data, setData] = useState<Record<string, any>>()
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const res = await getDeviceClass()
    res?.code === 200 && setData(res?.data)
  }
  return data
}

export default useGetAdressData
