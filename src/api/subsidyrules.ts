import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"

// 补贴规则列表
export const getList = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getSubsidyRule`, data)

// 规则新增
export const addRule = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/addSubsidyRule`, data)

// 规则编辑
export const editRule = (data: any, id: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/updateSubsidyRule/${id}`, data)

// 规则删除
export const deleRule = (data: any, id: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/deleteSubsidyRule/${id}`, data)
