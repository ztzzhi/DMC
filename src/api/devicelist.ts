import { getRequest, postRequest } from "../utils/request"

export const getList = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/getDeviceList", data)

export const getDeviceClass = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/getCategoryList", data)

export const addList = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/setDevice", data)

export const deleList = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/delDevice", data)

//设备下发
export const deviceGrant = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/distributeDevice", data)

//添加设备实体
export const addDevice = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/setDeviceItem", data)

//添加设备实体
export const snList = (data?: any): Promise<any> =>
  postRequest("/api/family-bed/user/getDeviceSnList", data)
