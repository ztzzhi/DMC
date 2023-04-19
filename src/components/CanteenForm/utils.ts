/* eslint-disable prettier/prettier */
import dayjs from "dayjs"
const timeFormat = "HH:mm"

export const time = (time: any) => dayjs(time).format(timeFormat)

//早中晚餐数据处理
export function timeAssignment(data: any) {
  const arr = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].time) {
      if (data[i].id) {
        arr.push({
          name: data[i].name,
          str_time: time(data[i].time[0]),
          end_time: time(data[i].time[1]),
          id: data[i].id
        })
      } else {
        arr.push({
          name: data[i].name,
          str_time: time(data[i].time[0]),
          end_time: time(data[i].time[1])
        })
      }
    }
  }
  return arr
}