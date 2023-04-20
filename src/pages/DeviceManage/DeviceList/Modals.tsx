import { useEffect, useState } from "react"
import { Space, Modal, Button, Form, Input, TreeSelect } from "antd"
//@ts-ignore
import RichEditor from "@/components/RichEditor"
import CustomForm from "@/components/EditForm"
import type { TableData } from "./types"
import { getList as instituList } from "@/api/institutionmanage"
import { getOrganSelect } from "@/api"
import useGetApplySele from "@/hooks/useGetApplySele"
export const SeeModal = ({ open, onCancel, data }: Partial<ModalProps>) => {
  return (
    <Modal open={open} onCancel={onCancel} footer={false} width={700}>
      <div style={{ height: 20 }} />
      <RichEditor
        content={data}
        height={500}
        imageUploadSource="prize-policy"
        readOnly={true}
        editorChange={() => 1}
      />
    </Modal>
  )
}
export function AddGrantModal(props: ModalProps) {
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
      onOk={() =>
        form.validateFields().then((vals: TableData) => onConfirm(vals))
      }
      onCancel={cancel}
    >
      <CustomForm
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        form={form}
        formConfigArray={[
          {
            name: "sn",
            label: "SN",
            type: "Input",
            placeholder: "请输入",
            rules: [
              {
                required: true,
                message: "请输入"
              }
            ]
          }
        ]}
      />
    </Modal>
  )
}

export function GrantModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [form] = Form.useForm()
  const applyData: any = useGetApplySele()
  const [organData, setOrdanData] = useState<any>()

  function cancel() {
    onCancel()
    form.resetFields()
  }
  return (
    <Modal
      title="设备发放"
      open={open}
      forceRender
      onOk={() =>
        form.validateFields().then((vals: TableData) => onConfirm(vals))
      }
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
                  setOrdanData(res?.data)
                  // setOrdanData(
                  //   res?.data?.map((item: any) => ({
                  //     label: item?.name,
                  //     value: item?.id
                  //   }))
                  // )
                }
              }
            }
          },
          // {
          //   name: "org_id",
          //   label: "发放机构",
          //   type: "Select",
          //   option: organData,
          //   placeholder: "请选择",
          //   rules: [
          //     {
          //       required: true,
          //       message: "请选择"
          //     }
          //   ]
          // },
          {
            name: "org_id",
            label: "发放机构",
            type: "Custom",
            placeholder: "请选择",
            rules: [
              {
                required: true
              }
            ],
            content: (
              <TreeSelect
                style={{ width: "100%" }}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="请选择"
                treeDefaultExpandAll
                fieldNames={{ value: "id", label: "name" }}
                treeData={organData}
              />
            )
          },
          {
            name: "num",
            label: "发放数量",
            type: "InputNumber",
            rules: [{ required: true, message: "请输入发放数量" }],
            placeholder: "请输入发放数量"
          }
        ]}
      />
    </Modal>
  )
}
