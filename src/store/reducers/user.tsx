import {
  USER_INFO,
  USER_ORGID,
  SELECT_ORGID,
  SELECT_ORGNAME
} from "../constant"

import { APP_ID } from "@/config"

export interface userType {
  user_info: IUserInfo
  org_id: number[] //用户食堂
  cur_id: number //用户当前选择的食堂索引
  cur_name: string //用户当前选择的食堂名称
}

export interface IUserInfo {
  address?: string
  email?: string
  id?: string
  id_card?: string
  name?: string
  phone?: string
  sex?: number
}

const initState: userType = {
  user_info: window.localStorage.getItem(APP_ID + "user_info")
    ? JSON.parse(window.localStorage.getItem(APP_ID + "user_info")!)
    : null,
  org_id: window.localStorage.getItem(APP_ID + "org_id")
    ? JSON.parse(window.localStorage.getItem(APP_ID + "org_id")!)
    : [],
  cur_id: window.localStorage.getItem(APP_ID + "cur_id")
    ? JSON.parse(window.localStorage.getItem(APP_ID + "cur_id")!)
    : null,
  cur_name: window.localStorage.getItem(APP_ID + "cur_name")
    ? JSON.parse(window.localStorage.getItem(APP_ID + "cur_name")!)
    : ""
}

export default function userReducer(preState = initState, action: any) {
  const { type, data } = action
  let newState
  switch (type) {
    case USER_INFO:
      newState = { ...preState, user_info: data.user_info }
      break
    case USER_ORGID:
      newState = { ...preState, org_id: data.org_id }
      break
    case SELECT_ORGID:
      newState = { ...preState, cur_id: data.cur_id }
      break
    case SELECT_ORGNAME:
      newState = { ...preState, cur_name: data.cur_name }
      break
    default:
      newState = preState
      break
  }
  return newState
}
