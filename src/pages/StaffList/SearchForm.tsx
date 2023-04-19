import QueryForm from "@/components/QueryForm"
import { Form } from "antd"
import { ProFormText } from "@ant-design/pro-components"
import { TableData } from "./types"
export default function SearchForm(props: SearchFormProps<TableData>) {
  const { onFinish, onReset } = props
  const [formSearch] = Form.useForm()
  return (
    <QueryForm onFinish={onFinish} onReset={onReset} form={formSearch}>
      <ProFormText name="name" label="姓名" />
      <ProFormText name="id_card" label="身份证" />
      <ProFormText name="age" label="年龄" />
    </QueryForm>
  )
}
