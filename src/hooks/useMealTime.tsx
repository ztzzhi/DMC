import { useEffect, useState } from "react"
import { getMealTime } from "@/api/weeklyMenu"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
const useMealTime = (): any => {
  const orgID = useSelector<RootState, any>(state => state.user.cur_id)
  const [data, setData] = useState()
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const res: Resolve = await getMealTime({ id: orgID })
    if (res?.code === 200) setData(res?.data)
  }
  return data
}

export default useMealTime
