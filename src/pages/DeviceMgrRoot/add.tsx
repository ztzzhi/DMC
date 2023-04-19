import { FC, useEffect, useState } from "react"
import {
  Button,
  Cascader,
  Form,
  Input,
  Select,
  Space,
  message,
  InputNumber
} from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import CanteenForm from "@/components/CanteenForm"
import { time, timeAssignment } from "@/components/CanteenForm/utils"
import { getDetails, editData } from "@/api/canteenmag"
import dayjs from "dayjs"
import { useNavigate, useSearchParams } from "react-router-dom"
const Index: FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const id = query.get("id")
  useEffect(() => {
    id && Details()
  }, [])
  const timeFormat = "HH:mm"
  async function Details() {
    form.setFieldsValue({})
  }

  function onFinish() {
    form
      .validateFields()
      .then(async (values: any) => {
        console.log(values)
      })
      .catch(err => {
        // setSendLoading(false)
        if (err?.errorFields && err?.errorFields[0]?.errors[0]) {
          message.error(err?.errorFields[0]?.errors[0])
        }
      })
  }

  return (
    <PageContainer
      title={`${id ? "编辑" : "添加"}设备`}
      footer={
        <>
          <Space>
            <Button onClick={() => navigate(-1)}>返回</Button>
            <Button type="primary" onClick={onFinish}>
              提交
            </Button>
          </Space>
        </>
      }
    >
      <Form
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 7 }}
        autoComplete="off"
      >
        <Form.Item
          label="设备编号"
          name="name"
          rules={[{ required: true, message: "请输入编号!" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="mac地址"
          name="mac"
          rules={[{ required: true, message: "请输入mac地址!" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="sex"
          label="设备类型"
          rules={[{ required: true, message: "请选择设备类型" }]}
        >
          <Select placeholder="请选择">
            <Select.Option value={1}>男</Select.Option>
            <Select.Option value={2}>女</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="sex"
          label="设备状态"
          rules={[{ required: true, message: "请选择设备状态" }]}
        >
          <Select placeholder="请选择">
            <Select.Option value={1}>男</Select.Option>
            <Select.Option value={2}>女</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="sex"
          label="绑定食堂"
          rules={[{ required: true, message: "请选择食堂" }]}
        >
          <Select placeholder="请选择">
            <Select.Option value={1}>男</Select.Option>
            <Select.Option value={2}>女</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="adress" label="供应商" rules={[{ required: false }]}>
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </PageContainer>
  )
}

export default Index
