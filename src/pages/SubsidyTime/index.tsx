import { FC, useEffect, useState } from "react"
import { Button, Space, Popconfirm, message } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import CustomTable from "@/components/CustomTable"
import { AddModal, EditModal } from "./Modal"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { getList, addTime, editTime, deleTime } from "@/api/subsidytime"
import dayjs from "dayjs"
const Index: FC = () => {
  const orgID = useSelector<RootState, any>(state => state.user.cur_id)
  const [isAddModal, setAddModal] = useState<boolean>(false)
  const [isEditModal, setEditModal] = useState<boolean>(false)
  const [editMag, setEditMag] = useState<any>()
  const [data, setData] = useState()
  useEffect(() => {
    getData()
  }, [])
  async function getData() {
    const res: Resolve = await getList({ org_id: orgID })
    res?.code === 200 && setData(res?.data?.lists)
  }

  async function onAdd(values: Record<string, any>) {
    const { time, ...vals } = values
    const res: Resolve = await addTime({
      ...vals,
      org_id: orgID,
      min_time: dayjs(time[0]).format("HH:mm"),
      max_time: dayjs(time[1]).format("HH:mm")
    })
    if (res?.code === 200) {
      setAddModal(false)
      getData()
      message.success("添加成功")
    }
  }

  async function onDelete(id: string) {
    const res: Resolve = await deleTime({ org_id: orgID }, id)
    if (res?.code === 200) {
      getData()
      message.success("删除成功")
    }
  }

  async function onEdit(values: Record<string, any>) {
    console.log(values)

    const { time, ...vals } = values
    const res: Resolve = await editTime(
      {
        ...vals,
        org_id: orgID,
        min_time: dayjs(time[0]).format("HH:mm"),
        max_time: dayjs(time[1]).format("HH:mm")
      },
      editMag?.id
    )
    if (res?.code === 200) {
      setEditModal(false)
      getData()
      message.success("编辑成功")
    }
  }
  const columns = [
    {
      title: "补贴时间段",
      align: "center",
      key: "txt",
      render: (data: any) => `${data?.min_time} - ${data?.max_time}`
    },
    {
      title: "补贴次数（次/人）",
      align: "center",
      dataIndex: "times",
      key: "times"
    },
    {
      title: "操作",
      align: "center",
      key: "operate",
      fixed: "right",
      width: 200,
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
        title="补贴时间段"
        extra={
          <Space>
            <Button
              type="primary"
              style={{ margin: "10px 0" }}
              onClick={() => setAddModal(true)}
            >
              新增时间段
            </Button>
          </Space>
        }
      />
      <CustomTable dataSource={data} columns={columns} />
      <AddModal
        open={isAddModal}
        onConfirm={onAdd}
        onCancel={() => setAddModal(false)}
      />
      <EditModal
        open={isEditModal}
        editData={editMag}
        onConfirm={onEdit}
        onCancel={() => setEditModal(false)}
      />
    </>
  )
}

export default Index
