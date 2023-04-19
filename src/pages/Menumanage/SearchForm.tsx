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
      <ProFormText name="name" label="功能名称" />
      <ProFormSelect options={appSelect} name="client_id" label="所属应用" />
      <ProFormSelect
        options={[
          { value: "1", label: "公共" },
          { value: "2", label: "应用" },
          { value: "3", label: "用户" }
        ]}
        name="is_power"
        label="功能权限"
      />
      <ProFormSelect
        options={[
          { value: "1", label: "路由" },
          { value: "2", label: "接口" }
        ]}
        name="route_type"
        label="功能状态"
      />
    </QueryForm>
  )
}
