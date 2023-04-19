import { Form, Button, Space, Modal, Input, Avatar, InputNumber } from "antd"
import EditForm from "@/components/EditForm"
import { useFormOpenCard } from "./useFormEdit"
import { CheckCard } from "@ant-design/pro-components"
import IconFont from "@/plugins/iconMgr"
import { UserOutlined } from "@ant-design/icons"

export function RechargeModal(props: ModalProps) {
  const { open, form, onConfirm, onCancel } = props
  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal
      title="充值"
      width={600}
      open={open}
      getContainer={false}
      onCancel={cancel}
      footer={null}
    >
      <Form
        layout="vertical"
        className="form_class"
        form={form}
        onFinish={vals => onConfirm(vals)}
      >
        <div className="top_main">
          <div className="inline_item">
            <Form.Item label="姓名" name="name">
              <Input disabled />
            </Form.Item>
            <Form.Item label="余额" name="balance">
              <Input disabled />
            </Form.Item>
          </div>

          <Form.Item name="id" />
          <div className="inline_item">
            <Form.Item label="身份证号" name="id_card">
              <Input disabled />
            </Form.Item>
          </div>
          <div className="inline_item inline_center">
            <Form.Item valuePropName="src" name="user_photo">
              <Avatar shape="square" size={100} icon={<UserOutlined />} />
            </Form.Item>
          </div>
        </div>
        <div className="center_main">
          <Form.Item
            label="充值金额"
            name="money"
            rules={[{ required: true, message: "请填写充值金额" }]}
          >
            <InputNumber min={0} placeholder="请填写充值金额" />
          </Form.Item>
          <Form.Item
            label="充值方式"
            name="type"
            rules={[{ required: true, message: "请填写充值金额" }]}
            initialValue={1}
          >
            <CheckCard.Group>
              <CheckCard
                title="支付宝"
                description={
                  <IconFont
                    type="icon-zhifubao"
                    style={{
                      fontSize: "30px"
                    }}
                  />
                }
                value={1}
              />
              <CheckCard
                title="微信"
                description={
                  <IconFont
                    type="icon-weixinzhifu"
                    style={{
                      fontSize: "30px"
                    }}
                  />
                }
                value={2}
              />
              <CheckCard
                title="现金"
                description={
                  <IconFont
                    type="icon-zhifu"
                    style={{
                      fontSize: "30px"
                    }}
                  />
                }
                value={3}
              />
            </CheckCard.Group>
          </Form.Item>
        </div>
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
export function RefundModal(props: ModalProps) {
  const { open, form, onConfirm, onCancel } = props
  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal
      title="退款"
      width={600}
      open={open}
      getContainer={false}
      onCancel={cancel}
      footer={null}
    >
      <Form
        layout="vertical"
        className="form_class"
        form={form}
        onFinish={vals => onConfirm(vals)}
      >
        <div className="top_main">
          <div className="inline_item">
            <Form.Item label="姓名" name="name">
              <Input disabled />
            </Form.Item>
            <Form.Item label="余额" name="balance">
              <Input disabled />
            </Form.Item>
          </div>
          <div className="inline_item">
            <Form.Item label="身份证号" name="id_card">
              <Input disabled />
            </Form.Item>
          </div>
          <div className="inline_item inline_center">
            <Form.Item valuePropName="src" name="user_photo">
              <Avatar shape="square" size={100} icon={<UserOutlined />} />
            </Form.Item>
          </div>
        </div>
        <div className="center_main">
          <Form.Item
            label="退款金额"
            name="money"
            rules={[{ required: true, message: "请填写退款金额" }]}
          >
            <Input placeholder="请填写退款金额" />
          </Form.Item>
        </div>
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

export function OpenCardModal(props: ModalProps) {
  const { open, form, onConfirm, onCancel } = props
  function cancel() {
    onCancel()
    form?.resetFields()
  }
  return (
    <Modal
      title="开卡"
      width={600}
      open={open}
      getContainer={false}
      onOk={() => {
        form
          .validateFields()
          .then((values: any) => onConfirm(values))
          .catch((err: any) => {
            console.log(err)
          })
      }}
      onCancel={cancel}
    >
      <EditForm
        formConfigArray={useFormOpenCard()}
        layout="vertical"
        form={form}
      />
    </Modal>
  )
}
