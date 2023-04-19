import { useState } from "react"
import { Space, Modal, Button, Form, Input, Radio } from "antd"
import Upload from "@/components/Upload"
import { phoneVerify, idCardVerify } from "@/utils/verify"
import CustomForm from "@/components/EditForm"
import useGetApplySele from "@/hooks/useGetApplySele"
import { getOrganSelect } from "@/api"
export function AddModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal
      title="添加"
      open={open}
      forceRender
      onOk={() => form.validateFields().then((vals: any) => onConfirm(vals))}
      onCancel={cancel}
    >
      <CustomForm
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        form={form}
        formConfigArray={addFormData}
      />
    </Modal>
  )
}
export function BindOrganModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  const applyData: any = useGetApplySele()
  const [organData, setOrdanData] = useState<any>()

  function cancel() {
    onCancel()
    // form.resetFields()
  }
  return (
    <Modal
      title="绑定机构"
      open={open}
      forceRender
      onOk={() => form.validateFields().then((vals: any) => onConfirm(vals))}
      onCancel={cancel}
    >
      <CustomForm
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        form={form}
        formConfigArray={[
          {
            name: "client_id",
            label: "所属应用",
            type: "Select",
            option: applyData,
            placeholder: "请选择所属应用",
            rules: [
              {
                required: true,
                message: "请选择所属应用"
              }
            ],
            config: {
              onChange: async (val: any) => {
                const res = await getOrganSelect({ client_id: val })
                if (res?.code === 200) {
                  setOrdanData(
                    res?.data?.map((item: any) => ({
                      label: item?.name,
                      value: item?.id
                    }))
                  )
                }
              }
            }
          },
          {
            name: "org_id",
            label: "机构",
            type: "Select",
            option: organData,
            placeholder: "请选择机构",
            rules: [
              {
                required: true,
                message: "请选择机构"
              }
            ]
          }
        ]}
      />
    </Modal>
  )
}

const addFormData = [
  {
    name: "username",
    label: "账号",
    type: "Input",
    placeholder: "请输入账号",
    rules: [{ required: true, message: "请输入账号" }]
  },
  {
    name: "phone",
    label: "手机号",
    type: "Input",
    placeholder: "请输入手机号",
    rules: [
      { required: true, message: "请输入手机号" },
      { validator: phoneVerify }
    ]
  },
  {
    name: "name",
    label: "员工姓名",
    type: "Input",
    placeholder: "请输入员工姓名",
    rules: [{ required: true, message: "请输入员工姓名" }]
  },
  {
    name: "id_card",
    label: "身份证号",
    type: "Input",
    placeholder: "请输入身份证号",
    rules: [
      { required: true, message: "请输入身份证号" },
      { validator: idCardVerify }
    ]
  },
  {
    name: "sex",
    label: "性别",
    type: "Custom",
    rules: [{ required: true, message: "请选择男女" }],
    content: (
      <Radio.Group>
        <Radio value={1}>男</Radio>
        <Radio value={2}>女</Radio>
      </Radio.Group>
    )
  },

  {
    name: "address",
    label: "地址",
    type: "TextArea",
    rules: [
      {
        required: true,
        message: "请输入地址"
      }
    ],
    config: { rows: 2, showCount: true, maxLength: 50 },
    placeholder: "请输入地址"
  }
]
