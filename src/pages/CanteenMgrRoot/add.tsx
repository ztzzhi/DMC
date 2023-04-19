import { FC, useEffect } from "react"
import { Form, message } from "antd"
import CanteenForm from "@/components/CanteenForm"
import { time, timeAssignment } from "@/components/CanteenForm/utils"
import { getDetails, editData } from "@/api/canteenmag"
import dayjs from "dayjs"
import { useNavigate, useSearchParams } from "react-router-dom"
const Index: FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const id = query.get("id")
  useEffect(() => {
    id && Details()
  }, [])
  const timeFormat = "HH:mm"
  async function Details() {
    const res = await getDetails({ id: id })
    if (res?.code === 200) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { business_hours, meal_time, ...vals } = res?.data
      const newBusinessHours = business_hours
        ? JSON.parse(business_hours)
        : { str_time: "", end_time: "" }
      const mealtime = meal_time?.map((item: any) => ({
        name: item?.name,
        time: [
          dayjs(item?.str_time, timeFormat),
          dayjs(item?.end_time, timeFormat)
        ],
        id: item?.id
      }))
      form.setFieldsValue({
        ...vals,
        business_hours: [
          newBusinessHours.str_time &&
            dayjs(newBusinessHours.str_time, timeFormat),
          newBusinessHours.str_time &&
            dayjs(newBusinessHours.end_time, timeFormat)
        ],
        mealtime
      })
    }
  }

  function onFinish() {
    form
      .validateFields()
      .then(async (values: any) => {
        const {
          business_hours,
          canteen_image,
          canteen_charter,
          canteen_image_desc,
          mealtime,
          ...vals
        } = values
        const businessHours = {
          str_time: time(business_hours[0]),
          end_time: time(business_hours[1])
        }
        const mealTime = timeAssignment(mealtime)
        const subData = {
          ...vals,
          business_hours: businessHours,
          meal_time: mealTime,
          canteen_image: canteen_image.toString(),
          canteen_charter: canteen_charter.toString(),
          canteen_image_desc: canteen_image_desc.toString()
        }
        if (id) {
          const res = await editData({
            ...subData,
            id: id
          })
          if (res?.code === 200) {
            message.success("编辑成功")
            navigate(-1)
          }
          return
        }

        const res = await editData(subData)
        if (res?.code === 200) {
          message.success("添加成功")
          navigate(-1)
        }
      })
      .catch(err => {
        if (err?.errorFields && err?.errorFields[0]?.errors[0]) {
          message.error(err?.errorFields[0]?.errors[0])
        }
      })
  }

  return (
    <CanteenForm
      title={`食堂信息${id ? "编辑" : "添加"}`}
      form={form}
      timeFormat={timeFormat}
      onFinish={onFinish}
      isBack={true}
      isAdd={id ? false : true}
      goBack={() => navigate(-1)}
    />
  )
}

export default Index
