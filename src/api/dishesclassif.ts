import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"
// 菜品分类列表
export const getList = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getCategoryList`, data)

// 菜品分类列表
export const addlist = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/setCategory`, data)

// 菜品分类列表删除
export const delelist = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/delCategory`, data)
