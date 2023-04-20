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
      title: "功能状态",
      align: "center",
      dataIndex: "route_type",
      key: "route_type",
      width: 100,

      render: (record: number) =>
        record == 1 ? <span>路由</span> : <span>接口</span>
    },
    {
      title: "功能权限",
      align: "center",
      dataIndex: "is_power",
      key: "is_power",
      width: 100,

      render: (record: number) =>
        record == 1 ? (
          <span>公共</span>
        ) : record == 2 ? (
          <span>应用</span>
        ) : (
          <span>用户</span>
        )
    },
    {
      title: "功能名称",
      align: "center",
      dataIndex: "title",
      key: "title",
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
      title: "功能路由",
      align: "center",
      dataIndex: "path",
      key: "path",
      width: 200
    },
    {
      title: "页面路径",
      align: "center",
      dataIndex: "source_path",
      key: "source_path",
      width: 200
    },
    {
      title: "是否栏目",
      align: "center",
      dataIndex: "is_menu",
      key: "is_menu",
      width: 150,

      render: (record: number) =>
        record == 1 ? <span>是</span> : <span>否</span>
    },
    {
      title: "栏目图标",
      align: "center",
      dataIndex: "menu_icon",
      key: "menu_icon",
      width: 150
    },
    {
      title: "请求方式",
      align: "center",
      dataIndex: "request_type",
      key: "request_type",
      width: 150
    },
    {
      title: "操作",
      align: "center",
      key: "operation",
      fixed: "right",
      render: (record: number) => (
        <Space>
          <Button type="link" onClick={() => props.handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" onClick={() => props.handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
      width: 200
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
      render: (type: number) => {
        const obj: Record<string, any> = { 0: "消费", 1: "充值", 2: "退款" }
        return obj[type]
      }
    },
    {
      title: "支付方式",
      align: "center",
      dataIndex: "pay_type",
      key: "pay_type",
      render: (type: string) => {
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
      render: (time: string) => dayjs(time).format("YYYY-MM-DD")
    }
  ]
  return TableColumn
}
