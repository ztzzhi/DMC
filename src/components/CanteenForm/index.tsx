import {
  Button,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Space,
  message
} from "antd"
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons"
import PageContainer from "@/components/PageContainer/PageContainer"
import Upload from "@/components/Upload"
import { phoneValidator } from "@/utils/validator"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { isDeleTime } from "@/api/canteenmgrroot"
import { useEffect, useState } from "react"
interface Props {
  title: string
  form: any
  timeFormat: string
  isBack?: boolean
  isAdd?: boolean
  onFinish: (...set: any) => void
  goBack?: () => void
}
const Index = (props: Props) => {
  const orgID = useSelector<RootState, number>(state => state.user.cur_id)
  const [mealTime, setMealTiime] = useState<any>()
  const { title, form, timeFormat, isBack, isAdd, onFinish, goBack } = props
  useEffect(() => {
    const mealtime = form.getFieldValue("mealtime")
    setMealTiime(mealtime)
  }, [props])
  return (
    <>
      <PageContainer
        title={title}
        footer={
          <>
            <Space>
              <Button
                style={{ display: isBack ? "" : "none" }}
                onClick={() => goBack!()}
              >
                返回
              </Button>
              <Button type="primary" onClick={onFinish}>
                提交
              </Button>
            </Space>
          </>
        }
      />
      <Form form={form} style={{ width: "30vw" }} autoComplete="off">
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
          基本信息
        </div>
        <Form.Item
          label="食堂名称"
          name="name"
          rules={[{ required: true, message: "请输入食堂名称!" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="负责人"
          name="person"
          rules={[{ required: true, message: "请输入负责人!" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            { required: true, message: "请输入手机号!" },
            { validator: phoneValidator }
          ]}
        >
          <InputNumber placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="address"
          label="详细地址"
          rules={[{ required: true, message: "请输入地址" }]}
        >
          <Input.TextArea
            showCount
            rows={1}
            maxLength={50}
            placeholder="请输入"
          />
        </Form.Item>

        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
          运营信息
        </div>

        <Form.Item
          name="business_hours"
          label="营业时间"
          rules={[{ required: true, message: "请选择营业时间" }]}
        >
          <TimePicker.RangePicker format={timeFormat} />
        </Form.Item>

        <Form.List name="mealtime">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex" }} align="baseline">
                  <Form.Item name={[name, "id"]} />
                  <Form.Item
                    label="用餐时间"
                    {...restField}
                    name={[name, "name"]}
                    rules={[{ required: true, message: "请输入" }]}
                  >
                    <Input placeholder="名称" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "time"]}
                    rules={[{ required: true, message: "请选择" }]}
                  >
                    <TimePicker.RangePicker format={timeFormat} />
                  </Form.Item>
                  <CloseCircleOutlined
                    onClick={async () => {
                      if (isAdd) {
                        remove(name)
                      } else {
                        if (mealTime?.[key]?.id) {
                          const res: Resolve = await isDeleTime({
                            org_id: orgID,
                            id: mealTime?.[key]?.id
                          })
                          if (res?.data?.count > 0) {
                            message.error("当前时间段有菜品，不可删除")
                          } else {
                            remove(name)
                          }
                        } else {
                          remove(name)
                        }
                      }
                    }}
                  />
                </Space>
              ))}
              <Form.Item label="  " colon={false}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  添加用餐时间
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          name="canteen_notice_board"
          label="食堂公告"
          rules={[{ required: false }]}
        >
          <Input.TextArea
            showCount
            rows={4}
            maxLength={100}
            placeholder="请输入"
          />
        </Form.Item>

        <Form.Item
          name="canteen_image"
          label="食堂封面"
          rules={[{ required: true, message: "请选择图片" }]}
        >
          <Upload max={1} />
        </Form.Item>

        <Form.Item
          name="canteen_charter"
          label="营业执照"
          rules={[{ required: true, message: "请选择图片" }]}
        >
          <Upload max={3} />
        </Form.Item>

        <Form.Item
          name="canteen_image_desc"
          label="食堂详情"
          rules={[{ required: true, message: "请选择图片" }]}
        >
          <Upload max={3} />
        </Form.Item>
      </Form>
    </>
  )
}

export default Index
