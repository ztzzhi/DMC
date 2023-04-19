import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"

// 食堂列表
export const getList = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getMenu`, data)

// 获取用餐时间段
export const getMealTime = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/CanteenMealTimeSelect`, data)

// 添加菜品
export const addLongOrShortDishes = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/addProductToMenu`, data)

// 编辑用餐时间
export const editDishesMealTime = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/updateMenuTime`, data)

// 删除菜品
export const deleteDishes = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/delProductFromMenu`, data)

// 出入库操作
export const storeroomOperate = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/updateStock`, data)

// 出入库列表
export const storeroomList = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getStockLogList`, data)

// 删除所有菜品
export const deleAllDishes = (data: any) =>
  postRequest(`/api/${REQUEST_TAG}/user/getMenuItem`, data)
