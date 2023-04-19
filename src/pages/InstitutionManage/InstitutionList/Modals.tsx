import { useEffect } from "react"
import { Space, Modal, Button, Form, Input, Select } from "antd"
import Upload from "@/components/Upload"
import { phoneVerify } from "@/utils/verify"
import useGetApplySele from "@/hooks/useGetApplySele"
export function AddModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const applyData: any = useGetApplySele()
  const [form] = Form.useForm()
  function cancel() {
    onCancel()
    form.resetFields()
  }
  return ModalForm({ title: "添加", open, form, onConfirm, cancel, applyData })
}
export function EditModal(props: ModalProps & { data: any }) {
  const applyData: any = useGetApplySele()
  const { open, data, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue(data)
  }, [data])
  function cancel() {
    onCancel()
    // form.resetFields()
  }
  return ModalForm({ title: "编辑", open, form, onConfirm, cancel, applyData })
}

const ModalForm = ({
  onConfirm,
  form,
  cancel,
  open,
  title,
  applyData
}: any) => (
  <Modal onCancel={cancel} title={title} open={open} footer={null} forceRender>
    <Form
      onFinish={vals => onConfirm(vals)}
      form={form}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        name="client_id"
        label="所属应用"
        rules={[{ required: true, message: "请输入机构名称" }]}
      >
        <Select placeholder="请选择">
          {applyData?.map((item: any) => (
            <Select.Option value={item.value} key={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="机构名称"
        rules={[{ required: true, message: "请输入机构名称" }]}
      >
        <Input placeholder="请输入机构名称" />
      </Form.Item>
      <Form.Item
        name="logo"
        label="机构logo"
        rules={[{ required: true, message: "请选择图片" }]}
      >
        <Upload max={1} />
      </Form.Item>

      <Form.Item
        name="address"
        label="机构地址"
        rules={[{ required: true, message: "请输入机构地址" }]}
      >
        <Input.TextArea
          showCount
          rows={2}
          maxLength={100}
          placeholder="请输入"
        />
      </Form.Item>
      <Form.Item
        name="contact"
        label="机构联系人"
        rules={[{ required: true, message: "请输入机构联系人" }]}
      >
        <Input placeholder="请输入机构联系人" />
      </Form.Item>
      <Form.Item
        label="联系方式"
        name="phone"
        rules={[
          { required: true, message: "请输入联系方式!" },
          { validator: phoneVerify }
        ]}
      >
        <Input style={{ width: "100%" }} placeholder="请输入" />
      </Form.Item>

      <div style={{ textAlign: "right" }}>
        <Space>
          <Button onClick={cancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Space>
      </div>
    </Form>
  </Modal>
)
