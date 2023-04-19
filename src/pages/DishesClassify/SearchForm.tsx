import QueryForm from "@/components/QueryForm"
import { Form } from "antd"
import { ProFormText } from "@ant-design/pro-components"
export default function SearchForm(props: SearchFormProps<{ name: string }>) {
  const { onFinish, onReset } = props
  const [formSearch] = Form.useForm()
  return (
    <QueryForm onFinish={onFinish} onReset={onReset} form={formSearch}>
      <ProFormText name="name" label="分类名称" />
    </QueryForm>
  )
}
