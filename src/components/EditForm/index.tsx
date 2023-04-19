import { Form, Input, DatePicker, InputNumber, Switch, Select } from "antd"
import Upload from "@/components/Upload"
const { RangePicker } = DatePicker
const { Option } = Select
import "./index.less"
interface Iprops {
  form: any
  formConfigArray?: IItemArray[]
  layout?: "inline" | "horizontal" | "vertical"
  isNotModal?: boolean //是否用于modal中 在modal中自动居中 在整个页面靠左 见于会员列表modal以及会员新增
  onFinish?: (...set: any) => void
}
interface IItemArray {
  name: string
  label: string
  type?: string
  option?: IOption[]
  config?: object
  valuePropName?: string //比如switch使用的是checked而不是value控制的状态 这时我们可以通过valuePropName把状态绑定到对应的属性上
  checked?: boolean
  rules?: any
  placeholder?: string
  tooltip?: string
}

interface IOption {
  label: string
  value: string | number
}

export default function EditFormComponent(props: Iprops) {
  const getComponents = (item: IItemArray) => {
    const value = item.type ? item.type : "Input"
    switch (value) {
      case "Search":
        return (
          <Input.Search
            placeholder={item.placeholder}
            {...item.config}
          ></Input.Search>
        )
        break
      case "TextArea":
        return (
          <Input.TextArea
            placeholder={item.placeholder}
            {...item.config}
          ></Input.TextArea>
        )
        break
      case "Upload":
        return <Upload {...item.config}></Upload>
        break
      case "InputNumber":
        return <InputNumber placeholder={item.placeholder} {...item.config} />
        break
      case "Select":
        return (
          <Select {...item.config} placeholder={item.placeholder}>
            {item.option &&
              item.option.map(mini => {
                return (
                  <Option value={mini.value} key={mini.value}>
                    {mini.label}
                  </Option>
                )
              })}
          </Select>
        )
        break
      case "Switch":
        return <Switch {...item.config}></Switch>
        break
      case "DatePicker":
        return (
          <DatePicker
            placeholder={item.placeholder}
            format="YYYY-MM-DD HH:mm:ss"
            {...item.config}
          ></DatePicker>
        )
        break
      case "RangePicker":
        return (
          <RangePicker
            format="YYYY-MM-DD HH:mm:ss"
            {...item.config}
          ></RangePicker>
        )
        break
      default:
        return <Input placeholder={item.placeholder} {...item.config}></Input>
        break
    }
  }
  // sm={24} md={24} lg={12} xl={8} xxl={6}
  return (
    <div className="form_edit_wrap">
      <Form
        form={props.form}
        onFinish={props.onFinish}
        labelAlign="right"
        labelCol={
          props.isNotModal
            ? { span: 4 }
            : { sm: 24, md: 24, lg: 6, xl: 6, xxl: 6 }
        }
        wrapperCol={
          props.isNotModal
            ? { span: 14 }
            : props.layout === "vertical"
            ? { sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }
            : { sm: 24, md: 24, lg: 14, xl: 14, xxl: 14 }
        }
        layout={props.layout ? props.layout : "horizontal"}
      >
        {props.formConfigArray &&
          props.formConfigArray.map((item, index) => {
            return (
              <Form.Item
                key={index}
                name={item.name}
                label={item.label}
                valuePropName={item.valuePropName}
                rules={item.rules}
                tooltip={item.tooltip}
              >
                {getComponents(item)}
              </Form.Item>
            )
          })}
      </Form>
    </div>
  )
}
