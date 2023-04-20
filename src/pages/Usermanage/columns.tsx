import { Space, Button } from "antd"
import type { ColumnsType } from "antd/lib/table"
import type { IDataSource } from "./types"
import dayjs from "dayjs"
type fun = (...set: any) => void
interface Iprops {
  handleShowModel: fun
  openBindOranModel: fun
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
      title: "账号",
      align: "center",
      dataIndex: "user_name",
      key: "user_name",
      width: 200
    },
    {
      title: "姓名",
      align: "center",
      dataIndex: "name",
      key: "name",
      width: 200
    },
    {
      title: "性别",
      align: "center",
      dataIndex: "sex",
      key: "sex",
      width: 100,
      render: record => (record == 1 ? <span>男</span> : <span>女</span>)
    },
    {
      title: "电话",
      align: "center",
      dataIndex: "phone",
      key: "phone",
      width: 200
    },
    {
      title: "地址",
      align: "center",
      dataIndex: "address",
      key: "address",
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
            绑定角色
          </Button>
          <Button
            type="link"
            onClick={() => props.openBindOranModel(record?.id)}
          >
            绑定机构
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
