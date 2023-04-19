import QueryForm from "@/components/QueryForm"
import { Form } from "antd"
import { ProFormDatePicker } from "@ant-design/pro-components"
export default function SearchForm(props: SearchFormProps<{ date: string }>) {
  const { onFinish, onReset } = props
  const [formSearch] = Form.useForm()
  return (
    <QueryForm onFinish={onFinish} onReset={onReset} form={formSearch}>
      <ProFormDatePicker name="date" label="日期" />
    </QueryForm>
  )
}
