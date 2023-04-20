import { useState } from "react"
import { Button, message } from "antd"
import SearchAdress from "@/components/SearchAdress"
import CustomTable from "@/components/CustomTable"
import { AddModal, EditModal } from "./Modals"
import columns from "./columns"
import { getList, addList, deleteList } from "@/api/administrativemanage"
import type { TableData } from "./types"
import useGetAdressData from "@/hooks/useGetAdressData"
import useConfirm from "@/hooks/useConfirm"
import useGetData from "./useGetData"
const Index = () => {
  const adressData = useGetAdressData()
  const [adressId, setAdressID] = useState<Record<string, number>>()
  const [isAddModal, setAddModal] = useState<boolean>(false)
  const [isEditModal, setEditModal] = useState<boolean>(false)
  const { setConfirm } = useConfirm()
  const [editModalData, setEditData] =
    useState<Record<string, number | string>>()

  const [oSrch, setSrch, data, isReq, setReq, loading] = useGetData<TableData>(
    getList,
    { limit: 10, parent_id: adressId?.area_id ?? 0 }
  )

  async function onAdd(values: TableData) {
    setConfirm({
      request: addList,
      params: { parent_id: values?.address_idarr[2], name: values?.name },
      success: () => {
        setReq(!isReq)
        setAddModal(false)
      },
      tip: "添加成功"
    })
  }

  async function onEdit(values: TableData) {
    setConfirm({
      request: addList,
      params: {
        parent_id: values?.address_idarr?.[2] ?? editModalData?.parent_id,
        name: values?.name,
        id: editModalData?.id
      },
      success: () => {
        setReq(!isReq)
        setEditModal(false)
      },
      tip: "编辑成功"
    })
  }

  async function onDele(id: number) {
    setConfirm({
      request: deleteList,
      params: { id },
      success: () => setReq(!isReq),
      tip: "删除成功"
    })
  }
  return (
    <SearchAdress
      isSearch={false}
      onTreeSelect={(obj: Record<string, number>) => {
        setSrch({ ...oSrch, parent_id: obj?.area_id })
        setAdressID(obj)
      }}
    >
      <div style={{ marginBottom: 15, textAlign: "right" }}>
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
          新增行政关系
        </Button>
      </div>
      <CustomTable
        dataSource={data?.lists}
        scroll={{ x: 800 }}
        loading={loading}
        columns={columns({
          openEditMoadl: data => {
            setEditData({ ...data, adressId })
            setEditModal(true)
          },
          onDele
        })}
        pagination={{
          total: data?.total,
          current: oSrch.page,
          onChange: (page, page_size) =>
            setSrch({ ...oSrch, page, limit: page_size })
        }}
      />
      <AddModal
        open={isAddModal}
        adressId={adressId}
        adressData={adressData}
        onConfirm={onAdd}
        onCancel={() => setAddModal(false)}
      />
      <EditModal
        data={editModalData}
        open={isEditModal}
        adressData={adressData}
        onConfirm={onEdit}
        onCancel={() => setEditModal(false)}
      />
    </SearchAdress>
  )
}

export default Index
