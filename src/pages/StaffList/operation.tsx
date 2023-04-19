import { FC, useEffect, useState } from "react"
import {
  Button,
  Cascader,
  Form,
  Input,
  Select,
  Space,
  message,
  InputNumber
} from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import Upload from "@/components/Upload"
import { useNavigate, useSearchParams } from "react-router-dom"
import { addStaffist, detailsStaffist } from "@/api/staffist"
import { TableData } from "./types"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { phoneValidator, idCardValidator } from "@/utils/validator"
const Index: FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const [isEdit, setEdit] = useState<boolean>()
  const id = query.get("id")
  const orgID = useSelector<RootState, any>(state => state.user.cur_id)

  useEffect(() => {
    id && getDetails()
  }, [])

  async function getDetails() {
    const res: Resolve = await detailsStaffist(id as string)
    if (res?.code === 200) {
      setEdit(!res?.data?.is_edit)
      form.setFieldsValue(res?.data)
    }
  }

  function onFinish() {
    form
      .validateFields()
      .then(async (values: TableData) => {
        const { user_photo, user_health_photo, ...vals } = values
        const subData = {
          org_id: orgID,
          user_photo: user_photo.toString(),
          user_health_photo: user_health_photo.toString(),
          ...vals
        }

        if (id && isEdit) partNoEdit()
        if (id && !isEdit) allEdit()
        !id && add()

        async function partNoEdit() {
          const res = await addStaffist({
            org_id: orgID,
            remark: values?.remark,
            id
          })
          prompt(res, "编辑")
        }

        async function allEdit() {
          const res = await addStaffist({
            ...subData,
            id
          })
          prompt(res, "编辑")
        }

        async function add() {
          const res = await addStaffist(subData)
          prompt(res, "添加")
        }

        function prompt(res: Resolve, str: string) {
          if (res?.code === 200) {
            message.success(`${str}成功`)
            navigate(-1)
          }
        }
      })
      .catch(err => {
        if (err?.errorFields && err?.errorFields[0]?.errors[0]) {
          message.error(err?.errorFields[0]?.errors[0])
        } else {
          message.error("系统异常")
        }
      })
  }

  return (
    <PageContainer
      title={`员工列表${id ? "编辑" : "新增"}`}
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
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
        基本信息
      </div>

      <Form
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 7 }}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: "请输入姓名!" }]}
        >
          <Input placeholder="请输入" disabled={isEdit} />
        </Form.Item>

        <Form.Item
          label="身份证号"
          name="id_card"
          rules={[
            { required: true, message: "请输入身份证号!" },
            { validator: idCardValidator }
          ]}
        >
          <Input placeholder="请输入" disabled={isEdit} />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            { required: true, message: "请输入手机号!" },
            { validator: phoneValidator }
          ]}
        >
          <Input placeholder="请输入" disabled={isEdit} />
        </Form.Item>

        <Form.Item
          name="sex"
          label="性别"
          rules={[{ required: true, message: "请选择性别" }]}
        >
          <Select placeholder="请选择" disabled={isEdit}>
            <Select.Option value={1}>男</Select.Option>
            <Select.Option value={2}>女</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
          rules={[{ required: true, message: "请输入年龄!" }]}
        >
          <InputNumber
            min={1}
            parser={(val: any) => (val.indexOf(".") > -1 ? parseInt(val) : val)}
            placeholder="请输入"
            disabled={isEdit}
          />
        </Form.Item>

        <Form.Item name="adress" label="详细地址" rules={[{ required: false }]}>
          <Input.TextArea
            showCount
            rows={1}
            maxLength={50}
            placeholder="请输入"
            disabled={isEdit}
          />
        </Form.Item>

        <Form.Item name="remark" label="备注" rules={[{ required: false }]}>
          <Input.TextArea
            showCount
            rows={3}
            maxLength={100}
            placeholder="请输入"
          />
        </Form.Item>

        <Form.Item
          name="user_photo"
          label="照片"
          rules={[{ required: true, message: "请选择图片" }]}
        >
          <Upload max={1} disabled={isEdit} />
        </Form.Item>

        <Form.Item
          name="user_health_photo"
          label="健康证"
          rules={[{ required: true, message: "请选择图片" }]}
        >
          <Upload max={1} disabled={isEdit} />
        </Form.Item>

        {/* <div style={{ fontSize: 16, fontWeight: 600 }}>账号信息</div>

          <Form.Item wrapperCol={{ offset: 2, span: 7 }}>
            <div>角色：李四</div>
            <div style={{ margin: "5px 0" }}>账号：156344</div>
            <div>密码：123456</div>
          </Form.Item> */}
      </Form>
    </PageContainer>
  )
}

export default Index
