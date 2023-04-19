import { useEffect, useState } from "react"
import { getCategoryList } from "@/api/foodmgr"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import type { IAxiosCategory } from "@/pages/FoodMgr/useFormEdit"
const useDishesClassify = () => {
  const cur_id = useSelector<RootState, number>(state => state.user.cur_id)
  const [data, setData] = useState()
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const res = await getCategoryList({ org_id: cur_id })
    const categoryList = res?.data?.lists?.map((item: IAxiosCategory) => {
      return {
        label: item.name,
        value: item.id + ""
      }
    })
    setData(categoryList)
  }
  return data
}

export default useDishesClassify
