import { getRequest, postRequest } from "../utils/request"

export const addClassify = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/setCategory", data)

export const deleClassify = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/delCategory", data)
