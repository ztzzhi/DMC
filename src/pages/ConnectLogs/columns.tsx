import { Space, Popconfirm } from "antd"

const columns = ({ openEditModal, onDelete }: any) => [
  {
    title: "名称",
    align: "center",
    dataIndex: "name"
  },
  {
    title: "交接人",
    align: "center",
    dataIndex: "name"
  },
  {
    title: "交接时间",
    align: "center",
    dataIndex: "name",
    render: (text: any) => <a>{text}</a>
  },
  {
    title: "接班人",
    align: "center",
    dataIndex: "name"
  },
  {
    title: "接班时间",
    align: "center",
    dataIndex: "name"
  },
  {
    title: "交接情况",
    align: "center",
    dataIndex: "name"
  },
  {
    title: "操作",
    align: "center",
    width: 200,
    render: (data: any) => (
      <Space size="middle">
        <a onClick={() => openEditModal(data?.key)}>接班</a>
        <a>详情</a>
      </Space>
    )
  }
]
export default columns
