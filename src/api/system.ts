import { getRequest, postRequest } from "@/utils/request"

// 用户列表
export const getMember = (data: any) => getRequest("/admin/member", data)

// 用户状态审核
export const memberVerify = (data: any) =>
  postRequest("/admin/member/verify", data)

// 用户详情
export const getMemberInfo = (id: any) =>
  getRequest(`/admin/member/detail/${id}`)

// 培训机构审核列表
export const getCultivate = (data: any) => getRequest("/admin/cultivate", data)

// 培训机构编辑
export const cultivateEdit = (id: any, data: any) =>
  postRequest(`/admin/cultivate_edit/${id}`, data)

// 培训机构审核
export const cultivateVerify = (id: any, data: any) =>
  postRequest(`/admin/cultivate_verify/${id}`, data)

// 重置培训机构后台登录密码
export const cultivateResetPasswd = (id: any) =>
  postRequest(`/admin/cultivate/reset_passwd/${id}`)

// 批量用户导入
export const batchMemberImport = (data: any) =>
  postRequest("/admin/member/import", data)

export const prizeProvide = (id: any, data: any) =>
  postRequest(`admin/prize/subsidies/${id}`, data)
