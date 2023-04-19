import { FC, useEffect, useState } from "react"
import { Form, message } from "antd"
import CanteenForm from "@/components/CanteenForm"
import { time, timeAssignment } from "@/components/CanteenForm/utils"
import { getDetails, editData } from "@/api/canteenmag"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import dayjs from "dayjs"
const Index: FC = () => {
  const [form] = Form.useForm()
  const [editID, setEditID] = useState()
  const orgID = useSelector<RootState, any>(state => state.user.cur_id)
  useEffect(() => {
    Details()
  }, [])
  const timeFormat = "HH:mm"
  async function Details() {
    const res = await getDetails({ id: orgID })
    if (res?.code === 200) {
      setEditID(res?.data?.id)
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

        const res = await editData({
          ...subData,
          id: editID
        })

        res?.code === 200 && message.success("保存成功")
      })
      .catch(err => {
        if (err?.errorFields && err?.errorFields[0]?.errors[0]) {
          message.error(err?.errorFields[0]?.errors[0])
        }
      })
  }

  return (
    <CanteenForm
      title={"食堂信息管理"}
      form={form}
      timeFormat={timeFormat}
      onFinish={onFinish}
    />
  )
}

export default Index
