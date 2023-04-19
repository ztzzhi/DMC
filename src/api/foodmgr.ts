import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"

// 分类列表
export const getCategoryList = (data?: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/getCategoryList`, data)

// 菜品列表
export const getProductList = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/getProductList`, data)

// 菜品添加
export const addProductList = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/setProduct`, data)

// 菜品添加
export const delProductList = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/delProduct`, data)

// 菜品上下架
export const changeProductStatus = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/changeProductStatus`, data)

// 菜品详情
export const getProductDetail = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/getProduct`, data)
