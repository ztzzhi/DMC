import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"

// 食堂列表
export const getList = (data?: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getCanteenList`, data)

// 开通关闭食堂
export const setIsOpen = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getCanteenStartUp`, data)

// 开通关闭食堂
export const isDeleTime = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getProductsNum`, data)
