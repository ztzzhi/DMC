import { FC, useState } from "react"
import { Button, message, Space } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import columns from "./columns"
import { AddModal, EditModal } from "./Modal"
import useGetData from "@/hooks/useGetData"
import { getList, addlist, delelist } from "@/api/dishesclassif"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import type { TableData } from "./types"
const Index: FC = () => {
  const orgID = useSelector<RootState, any>(state => state.user.cur_id)
  const [isAddModal, setAddModal] = useState<boolean>(false)
  const [isEditModal, setEditModal] = useState<boolean>(false)
  const [editMag, setEditMag] = useState<Record<string, string>>()
  const [oSrch, setSrch, tableData, isSendReq, setSendReq, loading] =
    useGetData<TableData>(getList, {
      org_id: orgID
    })

  async function onAdd(vals: TableData) {
    const res: Resolve = await addlist({ org_id: orgID, ...vals })
    if (res?.code === 200) {
      message.success("添加成功")
      setSendReq(!isSendReq)
      setAddModal(false)
    }
  }

  function openEditModal(id: string, name: string) {
    setEditMag({ id, name })
    setEditModal(true)
  }

  async function onEdit(vals: TableData) {
    const res: Resolve = await addlist({
      org_id: orgID,
      id: editMag?.id,
      ...vals
    })
    if (res?.code === 200) {
      message.success("编辑成功")
      setSendReq(!isSendReq)
      setEditModal(false)
    }
  }

  async function onDelete(id: number) {
    const res: Resolve = await delelist({ org_id: orgID, id })
    if (res?.code === 200) {
      setSendReq(!isSendReq)
      message.success("删除成功")
    }
  }
  return (
    <>
      <PageContainer
        title="菜品分类"
        extra={
          <Space>
            <Button
              type="primary"
              style={{ margin: "10px 0" }}
              onClick={() => setAddModal(true)}
            >
              添加分类
            </Button>
          </Space>
        }
      />
      <SearchForm
        onFinish={vals =>
          setSrch({ ...vals, page: 1, page_size: oSrch.page_size })
        }
        onReset={() => setSrch({ page: 1, page_size: oSrch.page_size })}
      />
      <CustomTable
        dataSource={tableData?.lists}
        loading={loading}
        columns={columns({ openEditModal, onDelete })}
        pagination={{
          total: tableData?.total,
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
        open={isEditModal}
        data={editMag}
        onConfirm={onEdit}
        onCancel={() => setEditModal(false)}
      />
    </>
  )
}
export default Index
