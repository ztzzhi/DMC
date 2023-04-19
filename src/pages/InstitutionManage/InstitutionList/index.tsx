import { useState } from "react"
import { Space, Button, message } from "antd"
import SearchAdress from "@/components/SearchAdress"
import CustomTable from "@/components/CustomTable"
import { AddModal, EditModal } from "./Modals"
import columns from "./columns"
import useGetData from "./useGetData"
import {
  getList,
  addItutionInst,
  editItutionInst,
  deleItutionInst
} from "@/api/institutionmanage"
import type { TableData } from "./types"
const Index = () => {
  const [adressId, setAdressID] = useState<Record<string, number>>()
  const [isAddModal, setAddModal] = useState<boolean>(false)
  const [isEditModal, setEditModal] = useState<boolean>(false)
  const [editModalData, setEditData] =
    useState<Record<string, number | string>>()
  const [oSrch, setSrch, data, isReq, setReq, loading] = useGetData<TableData>(
    getList,
    adressId?.area_id
  )

  async function onAdd(values: TableData) {
    const { logo, ...vals } = values
    const res: Resolve = await addItutionInst({
      ...adressId,
      ...vals,
      logo: logo.toString()
    })
    if (res?.code === 200) {
      setReq(!isReq)
      message.success("添加成功")
      setAddModal(false)
    }
  }

  async function onEdit(values: TableData) {
    const { logo, ...vals } = values
    const res: Resolve = await editItutionInst({
      id: editModalData?.id,
      area_id: editModalData?.area_id,
      ...vals,
      logo: logo.toString()
    })
    if (res?.code === 200) {
      setReq(!isReq)
      message.success("编辑成功")
      setEditModal(false)
    }
  }

  async function onDele(id: number) {
    const res: Resolve = await deleItutionInst({ id })
    if (res?.code === 200) {
      setReq(!isReq)
      message.success("删除成功")
    }
  }
  return (
    <SearchAdress
      onTreeSelect={(obj: Record<string, number>) => setAdressID(obj)}
    >
      <Space style={{ marginBottom: 15 }}>
        <Button
          type="primary"
          onClick={() => {
            if (!adressId) {
              message.error("请在左侧选择区县")
              return
            }
            setAddModal(true)
          }}
        >
          新增机构
        </Button>
      </Space>
      <CustomTable
        dataSource={data?.lists}
        scroll={{ x: 800 }}
        loading={loading}
        columns={columns({
          openEditMoadl: data => {
            setEditData(data)
            setEditModal(true)
          },
          onDele
        })}
        pagination={{
          total: data?.total,
          current: oSrch.page,
          onChange: (page, page_size) => setSrch({ ...oSrch, page, page_size })
        }}
      />
      <AddModal
        open={isAddModal}
        onConfirm={onAdd}
        onCancel={() => setAddModal(false)}
      />
      <EditModal
        data={editModalData}
        open={isEditModal}
        onConfirm={onEdit}
        onCancel={() => setEditModal(false)}
      />
    </SearchAdress>
  )
}

export default Index
