import { Space, Button, Tooltip } from "antd"
import type { ColumnsType } from "antd/lib/table"

interface IDataSource {
  name: string
  register_funds: string
  acreage: string
  register_address: string
  company_address: string
  afunction: string
  bfunction: string
  cfunction: string
}

interface Iprops {
  page: number
  pageSize: number
  handleEdit: (...set: any) => any
  handleDel: (...set: any) => any
}
export default function useColumns(props: Iprops) {
  // const { t } = useTranslation()
  const TableColumn: ColumnsType<IDataSource> = [
    {
      title: "序号",
      align: "center",
      dataIndex: "",
      key: "",
      width: 150,
      render: (_, __, index) => {
        return (props.page - 1) * props.pageSize + (index + 1)
      }
    },
    {
      title: "你好",
      align: "center",
      dataIndex: "name",
      key: "name",
      width: 150
    },
    {
      title: "你好啊",
      align: "center",
      dataIndex: "register_funds",
      key: "register_funds",
      width: 150
    },
    {
      title: "面积(平方米)",
      align: "center",
      dataIndex: "acreage",
      key: "acreage",
      width: 150
    },
    {
      title: "注册地址",
      align: "center",
      dataIndex: "register_address",
      key: "register_address",
      width: 150,
      ellipsis: true
    },
    {
      title: "注册地址1212",
      align: "center",
      dataIndex: "afunction",
      key: "afunction",
      width: 150,
      ellipsis: true
    },
    {
      title: "注册地址121212121",
      align: "center",
      dataIndex: "bfunction",
      key: "bfunction",
      width: 150
    },
    {
      title: "asdasdasdasd",
      align: "center",
      dataIndex: "cfunction",
      key: "cfunction",
      width: 150,
      ellipsis: true
    },
    {
      title: "经营地址",
      align: "center",
      dataIndex: "company_address",
      key: "company_address",
      width: 150,
      ellipsis: true,
      render: company_address => {
        return company_address && company_address.length > 20 ? (
          <Tooltip placement="topLeft" title={company_address}>
            {company_address}
          </Tooltip>
        ) : (
          company_address
        )
      }
    },
    {
      title: "操作",
      align: "center",
      fixed: "right",
      key: "operation",
      width: 170,
      render: () => {
        return (
          <div>
            <Space>
              <Button type="primary" onClick={props.handleEdit}>
                编辑
              </Button>
              <Button danger onClick={props.handleDel}>
                删除
              </Button>
            </Space>
          </div>
        )
      }
    }
  ]
  return TableColumn
}
