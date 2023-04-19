import QueryForm from "@/components/QueryForm"
import { Form } from "antd"
import {
  ProFormText,
  ProFormSelect,
  ProFormDigit
} from "@ant-design/pro-components"
import type { IDataSource } from "./types"
export default function SearchForm(props: SearchFormProps<IDataSource>) {
  const { onFinish, onReset } = props
  const [formSearch] = Form.useForm()
  return (
    <QueryForm onFinish={onFinish} onReset={onReset} form={formSearch}>
      <ProFormText name="user_name" label="账户" />
      <ProFormText name="name" label="姓名" />
      <ProFormText name="phone" label="电话" />
    </QueryForm>
  )
}
