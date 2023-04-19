import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"

// 员工列表
export const getList = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getUserList/staff`, data)

// 员工新增
export const addStaffist = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/setUsers/staff`, data)

// 员工详情
export const detailsStaffist = (id: string) =>
  postRequest(`/api/${REQUEST_TAG}/user/getIdToUserInfo?id=${id}`)

//开通关闭账号
export const openAccount = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getUserStartUp`, data)

//开通关闭账号
export const deleStaff = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/DelStaff`, data)
