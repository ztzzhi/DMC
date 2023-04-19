import { Space, Button, Popconfirm, Image } from "antd"
import type { ColumnsType } from "antd/lib/table"
import moren from "@/assets/images/moren.png"

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
  orderOperate: (...set: any) => void
  handleDetail: (...set: any) => any
  handleRefund: (...set: any) => any
}

export const payTypeMap = {
  "1": "支付宝",
  "2": "微信",
  "3": "现金",
  "4": "账户余额",
  "5": "市民卡"
}
export const statusMap = {
  "-1": "全部",
  "0": "未支付",
  "1": "已支付",
  "2": "已完成",
  "3": "已取消",
  "4": "已退款"
}
export const orderTypeMap = {
  "1": "食堂订单",
  "2": "助餐订单",
  "3": "其他"
}
export function useColumnsIndex(props: Iprops) {
  const TableColumn: ColumnsType<IDataSource> = [
    {
      title: "ID",
      align: "center",
      dataIndex: "id",
      key: "id",
      width: 150
    },
    {
      title: "菜品信息",
      align: "center",
      dataIndex: "dishes",
      key: "dishes",
      width: 150,
      render: src => src?.[0]?.name
    },
    {
      title: "点餐人",
      align: "center",
      dataIndex: "user",
      key: "user",
      width: 150,
      render: src => src?.name
    },
    {
      title: "点餐方式",
      align: "center",
      dataIndex: "buy_type",
      key: "buy_type",
      width: 150
    },
    {
      title: "支付方式",
      align: "center",
      dataIndex: "pay_type",
      key: "pay_type",
      width: 150
      // render: src => payTypeMap[src]
    },
    {
      title: "总计",
      align: "center",
      dataIndex: "total_money",
      key: "total_money",
      width: 150
    },
    {
      title: "支付金额",
      align: "center",
      dataIndex: "pay_money",
      key: "pay_money",
      width: 150
    },
    {
      title: "补贴金额",
      align: "center",
      dataIndex: "discounts_money",
      key: "discounts_money",
      width: 150
    },
    {
      title: "订单状态",
      align: "center",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: src => statusMap[src]
    },
    {
      title: "订单类型",
      align: "center",
      dataIndex: "order_type",
      key: "order_type",
      width: 150,
      render: src => orderTypeMap[src]
    },
    {
      title: "下单时间",
      align: "center",
      dataIndex: "created_at",
      key: "created_at",
      width: 150
    },
    {
      title: "操作",
      align: "center",
      fixed: "right",
      key: "operation",
      width: 200,
      render: item => {
        return (
          <div>
            <Space size="middle">
              <Popconfirm
                title="确定完成吗？"
                onConfirm={() => props.orderOperate(item?.id, "finish")}
                okText="确定"
                cancelText="取消"
              >
                <a>完成</a>
              </Popconfirm>
              <Popconfirm
                title="确定取消吗？"
                onConfirm={() => props.orderOperate(item?.id, "cancel")}
                okText="确定"
                cancelText="取消"
              >
                <a>取消</a>
              </Popconfirm>
              <a onClick={() => props.handleRefund(item?.id)}>退款</a>
              <a onClick={() => props.handleDetail(item?.id)}>详情</a>
            </Space>
          </div>
        )
      }
    }
  ]
  return TableColumn
}
