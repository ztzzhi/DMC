import { Space, Popconfirm } from "antd"
import type { ColumnsType } from "antd/es/table"
import { TableData } from "./types"
type fun = (id: any) => void
interface Props {
  goEditPage: fun
  onIsOpen: fun
}
const columns = ({ goEditPage, onIsOpen }: Props): ColumnsType<TableData> => [
  {
    title: "ID",
    align: "center",
    dataIndex: "key"
  },
  {
    title: "食堂名称",
    align: "center",
    dataIndex: "name"
  },
  {
    title: "负责人",
    align: "center",
    dataIndex: "person"
  },
  {
    title: "手机号",
    align: "center",
    dataIndex: "phone"
  },
  {
    title: "地址",
    align: "center",
    dataIndex: "address",
    width: 150
  },
  {
    title: "创建时间",
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
          title={`确定${data?.canteen_state === 0 ? "开启" : "关闭"}吗？`}
          onConfirm={() => onIsOpen(data?.key)}
          okText="确定"
          cancelText="取消"
        >
          <a style={{ color: data?.canteen_state === 0 ? "" : "red" }}>
            {data?.canteen_state === 0 ? "开启" : "关闭"}
          </a>
        </Popconfirm>
      </Space>
    )
  }
]
export default columns
