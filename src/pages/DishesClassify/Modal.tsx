import { useEffect } from "react"
import { Space, Modal, Button, Form, Input } from "antd"
export function AddModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal onCancel={cancel} title="添加分类" open={open} footer={null}>
      <Form
        onFinish={vals => onConfirm(vals)}
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: "请输入分类名称" }]}
        >
          <Input placeholder="请输入分类名称" />
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
}
export function EditModal(props: ModalProps) {
  const { open, data, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldValue("name", data?.name)
  }, [data])

  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal onCancel={cancel} title="编辑" open={open} footer={null}>
      <Form
        onFinish={vals => onConfirm(vals)}
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: "请输入分类名称" }]}
        >
          <Input placeholder="请输入分类名称" />
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
}
