import { REQUEST_TAG } from "@/config"
import { getRequest, postRequest } from "../utils/request"

export const getUsermanage = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/get_user_lists`, data)

export const appidGetRoule = (data: any): Promise<any> =>
  getRequest(`/api/${REQUEST_TAG}/user/appid_get_role`, data)

export const UserToRoule = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/set_user_to_role`, data)

//绑定机构
export const bindOrgan = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/set_user_org`, data)

// 新增
export const addList = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/set_user`, data)
