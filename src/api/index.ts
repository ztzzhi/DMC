//存放公共api方法
import { postRequest, getRequest } from "../utils/request"
// 公共图片上传 (不需要token验证)
export const imageUpload = (data: any): Promise<any> =>
  postRequest("/api/application/public/upload/image", data)
// 用户登录
export const userLogin = (data: any): Promise<any> =>
  postRequest("/api/application/public/login", data)

// 无感刷新token
export const refreshToken = (data: any): Promise<any> =>
  postRequest("/api/application/public/refreshToken", data)
// 用户信息
export const getUserInfo = (data: any): Promise<any> =>
  getRequest("/api/application/user/getUserInfo", data)

// menu
export const getMenuInfo = (data: any): Promise<any> =>
  postRequest("/api/application/app/get_app_menu", data)

// reqAuth
export const reqAuth = (
  code: any,
  client_id: any,
  redirect_uri: any
): Promise<any> =>
  postRequest("/api/application/public/login", {
    code,
    client_id,
    redirect_uri
  })

// getAdminRoute
export const getAdminRoute = (data?: any): Promise<any> =>
  postRequest("/api/application/public/login", data)

export const appidSetRoule = (data?: any): Promise<any> =>
  postRequest("/api/user/user/set_role", data)

export const listApp = (data?: any): Promise<any> =>
  postRequest("/api/application/user/get_app_lists", data)

export const listFunc = (data?: any): Promise<any> =>
  postRequest("/api/application/user/get_func_lists", data)

export const DelMenu = (id: any): Promise<any> =>
  getRequest("/api/application/user/del_func?id=" + id, {})

export const addFunc = (data?: any): Promise<any> =>
  postRequest("/api/application/user/set_func_info", data)

export const selectMenu = (data?: any): Promise<any> =>
  postRequest("/api/application/user/get_menu_select", data)

export const appidGetRoute = (data?: any): Promise<any> =>
  postRequest("/api/application/user/appid_get_route", { client_id: data })

export const AppToFunc = (data?: any): Promise<any> =>
  postRequest("/api/application/user/set_app_to_func", data)

export const addApp = (data?: any): Promise<any> =>
  postRequest("/api/application/user/set_app_info", data)

// 获取所有省市区列表
export const getAdressData = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/getRegions", data)

// 补全内容
export const getRegions = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/getRegionsFromKeys", data)

// 获取机构列表
export const getOrganSelect = (data?: any): Promise<any> =>
  getRequest("/api/user/user/get_org_select", data)

// 获取配置文件
export const getSelectConfig = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/getSelect", data)

//选择框内容
export const getSeleData = (data?: any): Promise<any> =>
  postRequest(`/api/family-bed/user/getSelect`, data)
