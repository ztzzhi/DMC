import { useEffect } from "react"
import { Space, Modal, Button, Form, Input, Select, Cascader } from "antd"
import Upload from "@/components/Upload"
import { phoneVerify } from "@/utils/verify"
import useGetApplySele from "@/hooks/useGetApplySele"
export function AddModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
    if (props.adressId) {
      const { province_id, city_id, area_id } = props.adressId
      form.setFieldsValue({ address_idarr: [province_id, city_id, area_id] })
    }
  }, [open])

  return (
    <Modal
      onOk={() => form.validateFields().then((vals: any) => onConfirm(vals))}
      onCancel={onCancel}
      title="新增"
      open={open}
      forceRender
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="address_idarr"
          label="上级行政关系"
          rules={[{ required: true, message: "请输入机构名称" }]}
        >
          <Cascader
            disabled={true}
            placeholder="请选择地区"
            fieldNames={{ label: "name", value: "id" }}
            options={props?.adressData}
          />
        </Form.Item>

        <Form.Item
          name="name"
          label="本级行政名称"
          rules={[{ required: true, message: "请输入本级行政名称" }]}
        >
          <Input placeholder="请输入本级行政名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export function EditModal(props: ModalProps & { data: any }) {
  const { open, data, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.resetFields()
    if (data && data?.adressId) {
      const { province_id, city_id, area_id } = data?.adressId as any
      form.setFieldsValue({
        address_idarr: [province_id, city_id, area_id]
      })
    }
    if (data?.name) {
      form.setFieldsValue({
        name: data?.name
      })
    }
  }, [open])

  function cancel() {
    onCancel()
    // form.resetFields()
  }
  return (
    <Modal
      onOk={() => form.validateFields().then((vals: any) => onConfirm(vals))}
      onCancel={cancel}
      title="新增"
      open={open}
      forceRender
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="address_idarr"
          label="上级行政关系"
          rules={[{ required: false, message: "请输入机构名称" }]}
        >
          <Cascader
            disabled={true}
            placeholder="请选择地区"
            fieldNames={{ label: "name", value: "id" }}
            options={props?.adressData}
          />
        </Form.Item>

        <Form.Item
          name="name"
          label="本级行政名称"
          rules={[{ required: true, message: "请输入本级行政名称" }]}
        >
          <Input placeholder="请输入本级行政名称" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
