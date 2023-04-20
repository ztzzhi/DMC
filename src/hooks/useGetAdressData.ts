import { useEffect, useState } from "react"
import { getAdressData } from "@/api"
const Index = () => {
  const [data, setData] = useState<any>()
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const res = await getAdressData()
    res?.code === 200 && setData(res?.data)
  }
  return data
}

export default Index
