import { Space, Popconfirm, Button, Image } from "antd"
import type { ColumnsType } from "antd/es/table"
import dayjs from "dayjs"
import { TableData } from "./types"
type fun = (id: any) => void
interface Props {
  openEditMoadl: fun
  onDele: fun
}
const columns = ({ openEditMoadl, onDele }: Props): ColumnsType<TableData> => [
  {
    title: "行政名称",
    align: "center",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "创建时间",
    align: "center",
    dataIndex: "created_at",
    key: "created_at",
    render: time => dayjs(time).format("YYYY-MM-DD HH:mm:ss")
  },

  {
    title: "操作",
    align: "center",
    fixed: "right",
    width: 200,
    render: (data: TableData) => (
      <Space size={1}>
        <Button type="link" onClick={() => openEditMoadl(data)}>
          编辑
        </Button>
        <Popconfirm
          title={`确定删除吗？`}
          onConfirm={() => onDele(data?.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" style={{ color: "red" }}>
            删除
          </Button>
        </Popconfirm>
      </Space>
    )
  }
]
export default columns
