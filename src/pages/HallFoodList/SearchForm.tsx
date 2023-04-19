import QueryForm from "@/components/QueryForm"
import { Form } from "antd"
import { ProFormDatePicker, ProFormSelect } from "@ant-design/pro-components"
export default function SearchForm(props: any) {
  const { onFinish, onReset } = props
  const [formSearch] = Form.useForm()
  return (
    <QueryForm onFinish={onFinish} onReset={onReset} form={formSearch}>
      <ProFormDatePicker name="date" label="创建时间" />
      <ProFormSelect
        name="buy_type"
        label="点餐方式"
        mode="single"
        options={[
          { label: "刷脸点餐", value: 1 },
          { label: "游客点餐", value: 2 },
          { label: "会员卡点餐", value: 3 },
          { label: "市民卡点餐", value: 4 },
          { label: "长者码点餐", value: 5 }
        ]}
      />
      <ProFormSelect
        name="pay_type"
        label="支付方式"
        mode="single"
        options={[
          { label: "支付宝", value: 1 },
          { label: "微信", value: 2 },
          { label: "现金", value: 3 },
          { label: "账户余额", value: 4 },
          { label: "市民卡", value: 5 }
        ]}
      />
      <ProFormSelect
        name="order_status"
        label="订单状态"
        mode="single"
        options={[
          { label: "全部", value: -1 },
          { label: "未支付", value: 0 },
          { label: "已支付", value: 1 },
          { label: "已完成", value: 2 },
          { label: "已取消", value: 3 },
          { label: "已退款", value: 4 }
        ]}
      />
    </QueryForm>
  )
}
