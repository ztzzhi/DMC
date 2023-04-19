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
      <ProFormSelect
        name="user_type"
        label="老人类型"
        mode="single"
        options={[
          { label: "低保", value: 1 },
          { label: "低边", value: 2 },
          { label: "特困", value: 3 },
          { label: "其他", value: 0 }
        ]}
      />
      <ProFormText name="name" label="姓名" />
      <ProFormText name="id_card" label="身份证号" />
      <ProFormDigit name="age" label="年龄" />
    </QueryForm>
  )
}
