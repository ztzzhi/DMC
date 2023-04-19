import { postRequest } from "../utils/request"

// 列表
export const getList = (data?: any) =>
  postRequest("/api/family-bed/user/getOrgList", data)

// 添加
export const addItutionInst = (data?: any) =>
  postRequest("/api/family-bed/user/saveOperator", data)

// 编辑
export const editItutionInst = (data?: any) =>
  postRequest("/api/family-bed/user/saveOperator", data)

// 删除
export const deleItutionInst = (data?: any) =>
  postRequest("/api/family-bed/user/deleteOrg", data)
