import QueryForm from "@/components/QueryForm"
import { Form } from "antd"
import { ProFormText } from "@ant-design/pro-components"
export default function SearchForm(props: any) {
  const { onFinish } = props
  const [formSearch] = Form.useForm()
  return (
    <QueryForm onFinish={onFinish} form={formSearch}>
      <ProFormText name="name" label="名称" />
    </QueryForm>
  )
}
