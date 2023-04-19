import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"

//食堂详情
export const getDetails = (data?: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/getCanteenDesc`, data)

//食堂编辑
export const editData = (data?: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/setCanteen`, data)
