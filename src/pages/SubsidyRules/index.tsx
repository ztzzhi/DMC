import { FC, useEffect, useState } from "react"
import { Button, Space, Popconfirm, message } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import CustomTable from "@/components/CustomTable"
import { AddModal, EditModal } from "./Modal"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { getList, addRule, editRule, deleRule } from "@/api/subsidyrules"
const Index: FC = () => {
  const orgID = useSelector<RootState, any>(state => state.user.cur_id)
  const [isAddModal, setAddModal] = useState<boolean>(false)
  const [isEditModal, setEditModal] = useState<boolean>(false)
  const [editMag, setEditMag] = useState<Record<string, number>>()
  const [data, setData] = useState()
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const res: Resolve = await getList({ org_id: orgID })
    res?.code === 200 && setData(res?.data?.lists)
  }

  async function onAdd(vals: Record<string, number>) {
    for (const key in vals) {
      if (vals[key] === null) {
        message.warn("数值不能为空")
        return
      }
    }
    const res: Resolve = await addRule({ ...vals, org_id: orgID })
    if (res?.code === 200) {
      setAddModal(false)
      getData()
      message.success("添加成功")
    }
  }

  async function onEdit(vals: Record<string, number>) {
    for (const key in vals) {
      if (vals[key] === null) {
        message.warn("数值不能为空")
        return
      }
    }
    const res: Resolve = await editRule({ ...vals, org_id: orgID }, editMag?.id)
    if (res?.code === 200) {
      setEditModal(false)
      getData()
      message.success("编辑成功")
    }
  }

  async function onDelete(id: string) {
    const res: Resolve = await deleRule({ org_id: orgID }, id)
    if (res?.code === 200) {
      getData()
      message.success("删除成功")
    }
  }
  const columns = [
    {
      title: "补贴规则",
      align: "center",
      key: "txt",
      width: 500,
      render: (data: Record<string, number>) =>
        `当老人年龄为 ${data?.min_age} 周岁~ ${data?.max_age} 周岁时，可享受优惠折扣 ${data?.discount} 折，每人每天优惠总额不超过 ${data?.max_amount} 元`
    },
    {
      title: "操作",
      align: "center",
      key: "operate",
      fixed: "right",
      width: 100,
      render: (data: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              setEditMag(data)
              setEditModal(true)
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="确定删除？"
            onConfirm={() => onDelete(data?.id)}
            okText="确定"
            cancelText="取消"
          >
            <a style={{ color: "red" }}>删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ]
  return (
    <>
      <PageContainer
        title="补贴规则管理"
        extra={
          <Space>
            <Button
              type="primary"
              style={{ margin: "10px 0" }}
              onClick={() => setAddModal(true)}
            >
              新增规则
            </Button>
          </Space>
        }
      />
      <CustomTable dataSource={data} columns={columns} scroll={{ x: 300 }} />
      <AddModal
        open={isAddModal}
        onConfirm={vals => onAdd(vals)}
        onCancel={() => setAddModal(false)}
      />
      <EditModal
        open={isEditModal}
        editMag={editMag}
        onConfirm={onEdit}
        onCancel={() => setEditModal(false)}
      />
    </>
  )
}

export default Index
