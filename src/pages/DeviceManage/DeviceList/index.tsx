import { FC, useEffect, useState } from "react"
import { Button, Space, message } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import CustomTabs from "./CustomTabs"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import { userColumns } from "./columns"
import { useNavigate } from "react-router-dom"
import { SeeModal, GrantModal, AddGrantModal } from "./Modals"
import useGetData from "@/hooks/useGetData"
import { getList, deleList, deviceGrant, addDevice } from "@/api/devicelist"
import { getSelectConfig } from "@/api"
import type { TableData } from "./types"
const Index: FC = () => {
  const [type, setType] = useState<string>(
    localStorage.getItem("deviceType") as string
  )

  const [isAddModal, setAddModal] = useState<boolean>(false)
  const [isGrantModal, setGrantModal] = useState<boolean>(false)
  const [isSeeModal, setSeeModal] = useState<boolean>(false)
  const [grantId, setGrantId] = useState<string>()
  const [seeModalData, setSeeModalData] = useState<string>()
  const [deviceTypeData, setDeviceTypeData] = useState<
    { key: number; value: string }[]
  >([])
  const navigate = useNavigate()

  useEffect(() => {
    setReq(!isReq)
  }, [type])
  useEffect(() => {
    getTabs()
  }, [])

  const getTabs = async () => {
    const res = await getSelectConfig()
    setDeviceTypeData(res.data.device_type)
  }
  const [oSrch, setSrch, data, isReq, setReq, loading] = useGetData<TableData>(
    getList,
    { type: +type }
  )
  async function onGrant(vals: TableData) {
    const res = await deviceGrant({ ...vals, device_id: grantId })
    if (res?.code === 200) {
      message.success("操作成功")
      setReq(!isReq)
      setGrantModal(false)
    }
  }
  async function onAdd(vals: TableData) {
    const res = await addDevice({ ...vals, device_id: grantId })
    if (res?.code === 200) {
      message.success("操作成功")
      setReq(!isReq)
      setAddModal(false)
    }
  }
  async function onDele(id: number) {
    const res: Resolve = await deleList({ id })
    if (res?.code === 200) {
      setReq(!isReq)
      message.success("删除成功")
    }
  }
  return (
    <>
      <PageContainer
        title="设备列表"
        extra={
          <Space>
            <Button type="primary" onClick={() => navigate("add")}>
              添加设备
            </Button>
          </Space>
        }
      />
      <CustomTabs
        onChange={vals => {
          // localStorage.setItem("deviceType", vals)
          setType(vals)
        }}
      />
      <SearchForm
        onFinish={(vals: any) =>
          setSrch({ ...vals, page: 1, page_size: oSrch.page_size })
        }
        onReset={() => setSrch({ page: 1, page_size: oSrch.page_size })}
      />
      <CustomTable
        dataSource={data?.lists}
        loading={loading}
        scroll={{ x: 1500 }}
        columns={userColumns({
          openAddModal: id => {
            // setGrantId(id)
            // setAddModal(true)
            navigate(`listadd?id=${id}`)
          },
          openSeeModal: txt => {
            setSeeModalData(txt)
            setSeeModal(true)
          },
          openGrantModal: id => {
            setGrantId(id)
            setGrantModal(true)
          },
          goEditPage: data =>
            navigate(`add?id=${data?.id}`, { state: { data } }),
          onDele
        })}
        pagination={{
          total: data?.total,
          current: oSrch.page,
          onChange: (page, page_size) => setSrch({ ...oSrch, page, page_size })
        }}
      />
      <AddGrantModal
        open={isAddModal}
        onConfirm={onAdd}
        onCancel={() => setAddModal(false)}
      />
      <GrantModal
        open={isGrantModal}
        onConfirm={onGrant}
        onCancel={() => setGrantModal(false)}
      />
      <SeeModal
        open={isSeeModal}
        data={seeModalData}
        onCancel={() => setSeeModal(false)}
      />
    </>
  )
}

export default Index
