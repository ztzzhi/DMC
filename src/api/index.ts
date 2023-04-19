//存放公共api方法
import { REQUEST_TAG } from "@/config"
import { postRequest, getRequest } from "@/utils/request"

// 公共图片上传 (不需要token验证)
export const imageUpload = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/public/upload/image`, data)

// 公共excel文件上传 (不需要token验证)
export const excelUpload = (data: any): Promise<any> =>
  postRequest(`/upload/excel`, data)

// 公共excel文件导入 (不需要token验证)
export const excelImport = (data: any): Promise<any> =>
  postRequest(`/upload/import`, data)

// 用户登录
export const userLogin = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/public/login`, data)

// 无感刷新token
export const refreshToken = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/public/refreshToken`, data)

// 用户信息
export const getUserInfo = (data: any): Promise<any> =>
  getRequest(`/api/${REQUEST_TAG}/user/getUserInfo`, data)

// menu
export const getMenuInfo = (data: any): Promise<any> =>
  getRequest(`/api/${REQUEST_TAG}/user/getAppInfo`, data)
