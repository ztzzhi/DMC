import { Space, Popconfirm, Button, Image } from "antd"
import type { ColumnsType } from "antd/es/table"
import { TableData } from "./types"
type fun = (id: any) => void
interface Props {
  openEditMoadl: fun
  onDele: fun
}
const columns = ({ openEditMoadl, onDele }: Props): ColumnsType<TableData> => [
  {
    title: "机构名称",
    align: "center",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "机构logo",
    align: "center",
    dataIndex: "logo",
    key: "logo",
    width: 140,
    render: src => (
      <Image
        width={100}
        src={src}
        fallback={new URL("@/assets/images/default.png", import.meta.url).href}
      />
    )
  },
  {
    title: "机构地址",
    align: "center",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "机构联系人",
    align: "center",
    dataIndex: "contact",
    key: "contact"
  },
  {
    title: "联系方式",
    align: "center",
    dataIndex: "phone",
    key: "phone"
  },
  // {
  //     title: '所属运营商',
  //     align: 'center',
  //     dataIndex: 'key',
  //     key: 'key'
  // },
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
