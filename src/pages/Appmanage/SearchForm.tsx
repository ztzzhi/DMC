import QueryForm from "@/components/QueryForm"
import { Form } from "antd"
import {
  ProFormText,
  ProFormSelect,
  ProFormDigit
} from "@ant-design/pro-components"
import type { IDataSource } from "./types"
export default function SearchForm(
  props: SearchFormProps<IDataSource> & { appSelect: any }
) {
  const { onFinish, onReset, appSelect } = props
  const [formSearch] = Form.useForm()
  return (
    <QueryForm onFinish={onFinish} onReset={onReset} form={formSearch}>
      <ProFormText name="client_name" label="应用标识" />
      <ProFormText name="client_prefix" label="服务前缀" />
      <ProFormText name="client_address" label="绑定地址" />
    </QueryForm>
  )
}
