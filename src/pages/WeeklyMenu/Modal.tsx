import { useEffect } from "react"
import { Space, Modal, Button, Form, InputNumber, Input } from "antd"
export function StorageModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal onCancel={cancel} title="入库" open={open} footer={null}>
      <Form
        onFinish={vals => onConfirm(vals)}
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="count"
          label="入库数量"
          rules={[{ required: true, message: "请输入入库数量" }]}
        >
          <InputNumber
            parser={(val: any) => (val.indexOf(".") > -1 ? parseInt(val) : val)}
            placeholder="请输入"
          />
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
export function OutboundModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal onCancel={cancel} title="出库" open={open} footer={null}>
      <Form
        onFinish={vals => onConfirm(vals)}
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="reason"
          label="出库原因"
          rules={[{ required: true, message: "请填写原因" }]}
        >
          <Input.TextArea
            showCount
            rows={3}
            maxLength={100}
            placeholder="请输入"
          />
        </Form.Item>
        <Form.Item
          name="count"
          label="出库数量"
          rules={[{ required: true, message: "请输入出库数量" }]}
        >
          <InputNumber
            parser={(val: any) => (val.indexOf(".") > -1 ? parseInt(val) : val)}
            placeholder="请输入"
          />
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
