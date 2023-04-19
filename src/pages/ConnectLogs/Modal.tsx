import {
  Space,
  Modal,
  Button,
  Form,
  TimePicker,
  InputNumber,
  Input
} from "antd"
export function ShiftModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal onCancel={cancel} title="交班" open={open} footer={null}>
      <Form
        onFinish={vals => onConfirm(vals)}
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="交接人"
          name="username"
          rules={[{ required: true, message: "请输入交接人!" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        {/* 自动输入 */}
        <Form.Item
          label="交接时间"
          name="username"
          rules={[{ required: true, message: "请输入交接时间!" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="asdew"
          label="收银台备用(元)"
          rules={[{ required: true, message: "请填写钱数" }]}
        >
          <InputNumber placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="asdew"
          label="现金收款(元)"
          rules={[{ required: true, message: "请填写钱数" }]}
        >
          <InputNumber placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="asdew"
          label="实际收款(元)"
          rules={[{ required: true, message: "请填写钱数" }]}
        >
          <InputNumber placeholder="请输入" />
        </Form.Item>

        <Form.Item name="intr" label="备注" rules={[{ required: false }]}>
          <Input.TextArea
            showCount
            rows={2}
            maxLength={50}
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
