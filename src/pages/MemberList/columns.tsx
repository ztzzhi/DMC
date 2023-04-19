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
  openRechargeModal: fun
  openRefundModal: fun
  goEditPage: fun
  openCardMaodal: fun
  goRecordPage: fun
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
      title: "照片",
      align: "center",
      dataIndex: "user_photo",
      key: "user_photo",
      width: 150,
      render: src => {
        return (
          <Image
            style={{ maxHeight: 100 }}
            src={src.split(",")?.[0]}
            fallback={moren}
          />
        )
      }
    },
    {
      title: "姓名",
      align: "center",
      dataIndex: "name",
      key: "name",
      width: 150
    },
    {
      title: "老人类型",
      align: "center",
      dataIndex: "user_type",
      key: "user_type",
      width: 150,
      render: type => {
        return typeMap[type]
      }
    },
    {
      title: "身份证号",
      align: "center",
      dataIndex: "id_card",
      key: "id_card",
      width: 170
    },
    {
      title: "性别",
      align: "center",
      dataIndex: "sex",
      key: "sex",
      width: 150,
      render: sex => {
        return sexMap[sex]
      }
    },
    {
      title: "年龄",
      align: "center",
      dataIndex: "age",
      key: "age",
      width: 150
    },
    {
      title: "手机号",
      align: "center",
      dataIndex: "phone",
      key: "phone",
      width: 150
    },
    {
      title: "账户余额",
      align: "center",
      dataIndex: "balance",
      key: "balance",
      width: 150
    },
    {
      title: "绑定卡号",
      align: "center",
      dataIndex: "card_no",
      key: "card_no",
      width: 150
    },
    {
      title: "补贴余额（当日）",
      align: "center",
      dataIndex: "butie",
      key: "butie",
      width: 150
    },
    {
      title: "操作",
      align: "center",
      fixed: "right",
      key: "operation",
      width: 230,
      render: item => {
        return (
          <div>
            <Space wrap>
              <Button type="link" onClick={() => props.openRechargeModal(item)}>
                充值
              </Button>
              <Button type="link" onClick={() => props.openRefundModal(item)}>
                退款
              </Button>
              <Button type="link" onClick={() => props.goEditPage(item.id)}>
                编辑
              </Button>
              <Button type="link" onClick={props.openCardMaodal}>
                开卡
              </Button>
              <Button type="link" onClick={() => props.goRecordPage(item?.id)}>
                交易记录
              </Button>
            </Space>
          </div>
        )
      }
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
        const obj = { 0: "消费", 1: "充值", 2: "退款" }
        return obj[type]
      }
    },
    {
      title: "支付方式",
      align: "center",
      dataIndex: "pay_type",
      key: "pay_type",
      render: type => {
        const obj = { alipay: "支付宝", wechat: "微信", cash: "余额" }
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
