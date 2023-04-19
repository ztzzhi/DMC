import { REQUEST_TAG } from "@/config"
import { getRequest, postRequest } from "../utils/request"

export const listRouleUser = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/get_user_role_lists`, data)

export const RouleToFunc = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/set_role_func`, data)

export const appidGetUserRoule = (id: any): Promise<any> =>
  getRequest(`/api/${REQUEST_TAG}/user/client_func?client_id=` + id)

export const UserToRoule = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/set_user_to_role`, data)

export const AppToFunc = (data: any): Promise<any> =>
  postRequest(`/api/application/user/set_app_to_func`, data)

export const DelRoule = (id: any): Promise<any> =>
  getRequest(`/api/${REQUEST_TAG}/user/del_roule?role_id=` + id)

export const RouleIdGetFuncIds = (id: any, client_id: any): Promise<any> =>
  getRequest(
    `/api/user/user/role_get_func?id=` + id + "&client_id=" + client_id
  )

export const GetRoleSelectData = (data?: any): Promise<any> =>
  postRequest(`/api/user/user/get_user_role_select`)
