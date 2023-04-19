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
      <ProFormSelect options={appSelect} name="client_id" label="所属应用" />
      <ProFormText name="role_key" label="角色标识" />
    </QueryForm>
  )
}
