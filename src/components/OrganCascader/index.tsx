import { useEffect, useState } from "react"
import { Cascader } from "antd"
import { listApp, getOrganSelect } from "@/api"
const Index = () => {
  const [options, setOptions] = useState<any>()
  useEffect(() => {
    getAppSelect()
  }, [])
  const getAppSelect = (params: any = {}) => {
    params.page = 1
    params.limit = 1000
    listApp(params).then(r => {
      if (r.code === 200) {
        setOptions(
          r?.data?.lists?.map((item: any) => {
            return {
              ...item,
              value: item.client_id,
              label: item.client_desc + "-" + item.client_id
            }
          })
        )
      }
    })
  }

  const loadData = async (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    const res = await getOrganSelect({ client_id: targetOption?.client_id })
    if (res?.code === 200) {
      targetOption.children = res?.data?.map((item: any) => ({
        label: item?.contact,
        value: item?.id
      }))
      targetOption.loading = false
      setOptions([...options])
    }
  }

  return <Cascader options={options} loadData={loadData} />
}

export default Index
