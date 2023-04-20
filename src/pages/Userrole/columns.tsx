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
  handleShowModel: fun
  handleEdit: fun
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
      title: "角色名称",
      align: "center",
      dataIndex: "role_name",
      key: "role_name",
      width: 200
    },
    {
      title: "角色标识",
      align: "center",
      dataIndex: "role_key",
      key: "role_key",
      width: 200
    },
    {
      title: "所属应用",
      align: "center",
      dataIndex: "client_id",
      key: "client_id",
      width: 350
    },
    {
      title: "操作",
      align: "center",
      key: "operation",
      fixed: "right",
      render: record => (
        <Space>
          <Button type="link" onClick={() => props.handleShowModel(record)}>
            绑定功能
          </Button>
          <Button type="link" onClick={() => props.handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => props.handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
      width: 250
    }
  ]
  return TableColumn
}

export function useColumnsRecord() {
  const TableColumn: ColumnsType<IDataSource> = [
    {
      title: "金额(元)",
      align: "center",
      dataIndex: "balance",
      key: "balance"
    },
    {
      title: "余额(元)",
      align: "center",
      dataIndex: "old_balance",
      key: "old_balance"
    },
    {
      title: "类型",
      align: "center",
      dataIndex: "up_type",
      key: "up_type",
      render: type => {
        const obj: Record<string, any> = { 0: "消费", 1: "充值", 2: "退款" }
        return obj[type]
      }
    },
    {
      title: "支付方式",
      align: "center",
      dataIndex: "pay_type",
      key: "pay_type",
      render: type => {
        const obj: Record<string, any> = {
          alipay: "支付宝",
          wechat: "微信",
          cash: "余额"
        }
        return obj[type]
      }
    },
    {
      title: "生成时间",
      align: "center",
      dataIndex: "created_at",
      key: "created_at",
      render: time => dayjs(time).format("YYYY-MM-DD")
    }
  ]
  return TableColumn
}
