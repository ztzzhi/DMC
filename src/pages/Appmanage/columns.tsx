import { Space, Button, Image } from "antd"
import type { ColumnsType } from "antd/lib/table"
import type { IDataSource } from "./types"
import moren from "@/assets/images/moren.png"
import dayjs from "dayjs"
const sexMap: { [propName: number]: string } = { 0: "未知", 1: "男", 2: "女" }
const typeMap: { [propName: number]: string } = {
  0: "其他",
  1: "低保",
  2: "低边",
  3: "特困"
}
type fun = (...set: any) => void
interface Iprops {
  handleEdit: fun
  handleShowModel: fun
  handleShowKey: fun
  handleDelete: fun
}
export function useColumnsIndex(props: Iprops) {
  const TableColumn: ColumnsType<IDataSource> = [
    {
      title: "ID",
      align: "center",
      dataIndex: "id",
      key: "id",
      width: 200
    },
    {
      title: "应用标识",
      align: "center",
      dataIndex: "client_name",
      key: "client_name",
      width: 150
    },
    {
      title: "应用简介",
      align: "center",
      dataIndex: "client_desc",
      key: "client_desc",
      width: 150
    },
    {
      title: "服务前缀",
      align: "center",
      dataIndex: "client_prefix",
      key: "client_prefix",
      width: 150
    },
    {
      title: "绑定地址",
      align: "center",
      dataIndex: "client_address",
      key: "client_address",
      width: 200
    },
    {
      title: "绑定节点",
      align: "center",
      dataIndex: "client_node_address",
      key: "client_node_address",
      width: 250
    },
    {
      title: "客户端地址",
      align: "center",
      dataIndex: "do_main",
      key: "do_main",
      ellipsis: true,
      width: 200
    },
    {
      title: "client_id",
      align: "center",
      dataIndex: "client_id",
      key: "client_id",
      width: 400
    },
    {
      title: "操作",
      align: "center",
      key: "operation",
      fixed: "right",
      render: record => (
        <Space>
          {/* <Button type="link" onClick={() => showDetail(record)}>详情</Button> */}
          <Button type="link" onClick={() => props.handleEdit(record)}>
            服务配置
          </Button>
          <Button type="link" onClick={() => props.handleShowKey(record)}>
            服务秘钥
          </Button>
          <Button type="link" onClick={() => props.handleShowModel(record)}>
            绑定功能
          </Button>
          <Button type="link" onClick={() => props.handleDelete(record)}>
            下线
          </Button>
          <Button type="link" onClick={() => props.handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
      width: 450
    }
  ]
  return TableColumn
}
