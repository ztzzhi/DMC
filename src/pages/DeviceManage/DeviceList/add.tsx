import { FC, useEffect, useState } from "react"
import { Button, TreeSelect, Form, Input, Select, Space, message } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useNavigate, useSearchParams, useLocation } from "react-router-dom"
import { TableData } from "./types"
//@ts-ignore
import RichEditor from "@/components/RichEditor"
//@ts-ignore
import { ContentUtils } from "braft-utils"
import useGetDeviceClass from "@/hooks/useGetDeviceClass"
import { addList } from "@/api/devicelist"
import Upload from "@/components/Upload"
import useGetSeleData from "@/hooks/useGetSeleData"
const Index: FC = () => {
  const seleData = useGetSeleData()
  const [form] = Form.useForm()
  const locationState = useLocation().state
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const id = query.get("id")
  const [activation, setActivation] = useState<any>()
  const [docking, setDocking] = useState<any>()
  const [deviceType, setDeviceType] = useState()
  useEffect(() => {
    if (id) {
      setActivation(locationState?.data?.active_type)
      setDocking(locationState?.data?.docking_mode)
      form.setFieldsValue(locationState?.data)
    }
  }, [])

  // const [docking, setDocking] = useState<any>(
  //   '<p>12321</p><div class="media-wrap image-wrap"><img src="http://testapp.tt114.com/file/canteen/4c477a1d07fb0a2610816dc0fda21cb0.jpg"/></div><p></p>'
  // )
  const deviceClassData: any = useGetDeviceClass()
  useEffect(() => {
    id && getDetails()
  }, [])

  async function getDetails() {
    // console.log(1)
  }

  function onFinish() {
    form
      .validateFields()
      .then(async (values: TableData) => {
        const { active_type, docking_mode, device_icon, ...vals } = values
        const subData = {
          ...vals,
          device_icon: device_icon.toString(),
          active_type:
            typeof active_type === "string"
              ? active_type
              : active_type?.toHTML(),
          docking_mode:
            typeof docking_mode === "string"
              ? docking_mode
              : docking_mode?.toHTML()
        }
        if (id) {
          //@ts-ignore
          subData["id"] = id
        }
        const res = await addList(subData)
        if (res?.code === 200) {
          message.success("操作成功")
          navigate(-1)
        }
      })
      .catch(err => {
        if (err?.errorFields && err?.errorFields[0]?.errors[0]) {
          message.error(err?.errorFields[0]?.errors[0])
        } else {
          console.error(err)
        }
      })
  }

  // 自定义上传图片
  const uploadChange = (info: any, data: Record<string, string>, set: any) => {
    if (info.file.response?.code === 200) {
      const fileData = info.file.response?.data
      // eslint-disable-next-line prefer-const
      let imgUrl = fileData?.all_url
      set(
        ContentUtils?.insertMedias(data, [
          {
            type: "IMAGE",
            url: imgUrl
          }
        ])
      )
    }
  }

  return (
    <PageContainer
      title={`设备列表${id ? "编辑" : "新增"}`}
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
        wrapperCol={{ span: 10 }}
        autoComplete="off"
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: "请输入名称!" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="厂商"
          name="manufacturer"
          rules={[{ required: true, message: "请输入厂商!" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="类型"
          name="type"
          rules={[{ required: true, message: "请输入类型!" }]}
        >
          <Select
            placeholder="请选择"
            onSelect={val => {
              setDeviceType(val)
            }}
          >
            {seleData?.device_type?.map((item: any) => (
              <Select.Option key={item?.key} value={item?.key}>
                {item?.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="型号"
          name="model"
          rules={[{ required: true, message: "请输入型号!" }]}
        >
          {deviceType === 3 ? (
            <Select placeholder="请选择">
              <Select.Option value="U">01型床带</Select.Option>
              <Select.Option value="T">02型床带</Select.Option>
              <Select.Option value="X">01型床垫</Select.Option>
            </Select>
          ) : (
            <Input placeholder="请输入" />
          )}
        </Form.Item>

        <Form.Item
          name="category"
          label="设备分类"
          rules={[{ required: true, message: "请输入设备分类!" }]}
        >
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="请选择"
            allowClear
            treeDefaultExpandAll
            fieldNames={{ value: "id", label: "name" }}
            treeData={deviceClassData}
          />
        </Form.Item>

        <Form.Item
          name="device_icon"
          label="图片"
          rules={[{ required: true, message: "请选择图片" }]}
        >
          <Upload max={1} />
        </Form.Item>

        <Form.Item
          name="active_type"
          label="激活方式"
          rules={[{ required: true, message: "请输入激活方式" }]}
        >
          <RichEditor
            content={activation}
            height={300}
            imageUploadSource="prize-policy"
            editorChange={(val: any) => {
              setActivation(val)
              form.setFieldValue("active_type", activation)
            }}
            uploadChange={(val: any) => {
              uploadChange(val, activation, setActivation)
              form.setFieldValue("active_type", activation)
            }}
          />
        </Form.Item>

        <Form.Item
          name="docking_mode"
          label="对接方式"
          rules={[{ required: true, message: "请选择激活方式" }]}
        >
          <RichEditor
            content={docking}
            height={300}
            imageUploadSource="prize-policy"
            editorChange={(val: string) => {
              setDocking(val)
              form.setFieldValue("docking_mode", docking)
            }}
            uploadChange={(val: string) => {
              uploadChange(val, docking, setDocking)
              form.setFieldValue("docking_mode", docking)
            }}
          />
        </Form.Item>
      </Form>
    </PageContainer>
  )
}

export default Index
