import { useEffect } from "react"
import { Space, Modal, Button, Form, TimePicker, InputNumber } from "antd"
import dayjs from "dayjs"
export function AddModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal onCancel={cancel} title="添加时间段" open={open} footer={null}>
      <Form
        onFinish={vals => onConfirm(vals)}
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="time"
          label="补贴时间段"
          rules={[{ required: true, message: "请输入补贴时间段" }]}
        >
          <TimePicker.RangePicker format={"HH:mm"} />
        </Form.Item>

        <Form.Item
          name="times"
          label="补贴次数"
          rules={[{ required: true, message: "请填写次数" }]}
        >
          <InputNumber placeholder="请输入" />
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
  const { open, editData, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        times: editData?.times,
        time: [
          dayjs(editData?.min_time, "HH:mm"),
          dayjs(editData?.max_time, "HH:mm")
        ]
      })
    }
  }, [open])
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
          name="time"
          label="补贴时间段"
          rules={[{ required: true, message: "请输入补贴时间段" }]}
        >
          <TimePicker.RangePicker format={"HH:mm"} />
        </Form.Item>

        <Form.Item
          name="times"
          label="补贴次数"
          rules={[{ required: true, message: "请填写次数" }]}
        >
          <InputNumber placeholder="请输入" />
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
