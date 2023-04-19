import { APP_ID } from "@/config"
import {
  USER_INFO,
  USER_ORGID,
  SELECT_ORGID,
  SELECT_ORGNAME
} from "../constant"

export interface userType {
  user_info: IUserInfo
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
    : null
}

export default function userReducer(preState = initState, action: any) {
  const { type, data } = action
  let newState
  switch (type) {
    case USER_INFO:
      newState = { ...preState, user_info: data.user_info }
      break
    default:
      newState = preState
      break
  }
  return newState
}
