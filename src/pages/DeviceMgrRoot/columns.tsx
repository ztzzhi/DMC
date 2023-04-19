import { Space, Popconfirm } from "antd"
import type { ColumnsType } from "antd/es/table"
import { TableData } from "./types"
type fun = (id: any) => void
interface Props {
  goEditPage: fun
  onDelete: fun
}
const columns = ({ goEditPage, onDelete }: Props): ColumnsType<TableData> => [
  {
    title: "设备编号",
    align: "center",
    dataIndex: "key"
  },
  {
    title: "mac地址",
    align: "center",
    dataIndex: "name"
  },
  {
    title: "设备类型",
    align: "center",
    dataIndex: "person"
  },
  {
    title: "设备状态",
    align: "center",
    dataIndex: "phone"
  },
  {
    title: "供应商",
    align: "center",
    dataIndex: "address",
    width: 150
  },
  {
    title: "绑定食堂",
    align: "center",
    dataIndex: "created_at"
  },
  {
    title: "添加时间",
    align: "center",
    dataIndex: "created_at"
  },
  {
    title: "操作",
    align: "center",
    fixed: "right",
    width: 200,
    render: (data: TableData) => (
      <Space size="middle">
        <a type="primary" onClick={() => goEditPage(data?.key)}>
          编辑
        </a>
        <Popconfirm
          title={`确定删除吗？`}
          onConfirm={() => onDelete(data?.key)}
          okText="确定"
          cancelText="取消"
        >
          <a style={{ color: "red" }}>删除</a>
        </Popconfirm>
      </Space>
    )
  }
]
export default columns
