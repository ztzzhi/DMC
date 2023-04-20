import { getRequest, postRequest } from "../utils/request"

export const getList = (data?: any): Promise<any> =>
  postRequest("/api/application/user/get_sub_regions", data)

export const addList = (data?: any): Promise<any> =>
  postRequest("/api/application/user/add_region", data)

export const deleteList = (data?: any): Promise<any> =>
  postRequest("/api/application/user/del_region", data)
