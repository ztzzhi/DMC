import useGetSeleData from "@/hooks/useGetSeleData"
import { Tabs } from "antd"
import { useState } from "react"
const Index = (props: { onChange: (key: string) => void }) => {
  const [type, setType] = useState(localStorage.getItem("deviceType") ?? "1")
  const seleData = useGetSeleData()
  return (
    <>
      <Tabs
        activeKey={type}
        size="small"
        onChange={key => {
          localStorage.setItem("deviceType", key)
          props.onChange(key)
          setType(key)
        }}
        items={seleData?.device_type?.map(({ key, value }: any) => ({
          key: String(key),
          label: value
        }))}
      />
    </>
  )
}

export default Index
