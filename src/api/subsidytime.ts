import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"

// 补贴时间段列表
export const getList = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getSubsidyPeriod`, data)

// 时间段新增
export const addTime = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/addSubsidyPeriod`, data)

// 时间段编辑
export const editTime = (data: any, id: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/updateSubsidyPeriod/${id}`, data)

// 时间段删除
export const deleTime = (data: any, id: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/deleteSubsidyPeriod/${id}`, data)
