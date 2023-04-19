import QueryForm from "@/components/QueryForm"
import { Form } from "antd"
import { ProFormText, ProFormSelect } from "@ant-design/pro-components"
import type { TableData } from "./types"
const SearchForm = (props: SearchFormProps<TableData>) => {
  const [formSearch] = Form.useForm()
  const { onFinish, onReset } = props
  return (
    <QueryForm onFinish={onFinish} onReset={onReset} form={formSearch}>
      {/* <ProFormText name="id_card" label="设备编号" /> */}
      <ProFormText name="model" label="设备型号" />
    </QueryForm>
  )
}

export default SearchForm
