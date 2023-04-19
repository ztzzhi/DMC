import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"

// 列表
export const getOrderList = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/orderList`, data)

// 详情
export const getOrderDetail = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/orderItem`, data)

// 详情
export const setOrderState = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/orderOperate`, data)
