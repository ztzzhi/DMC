/*
 * axios全局配置
 */
import axios from "axios"
import { message } from "antd"

import store from "../store"
import qs from "qs"
import { changeTokenAction } from "@/store/actions/login"
import { refreshToken, getUserInfo } from "@/api/index"
import {
  changeUserInfoAction,
  changeUserOrgIdAction
} from "@/store/actions/user"
import { APP_ID } from "@/config"

const instance = axios.create({
  timeout: 4000
})

//配置请求拦截器
instance.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem(APP_ID)
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//配置响应拦截器
instance.interceptors.response.use(
  response => {
    if (response?.data?.code === 200) {
      return response?.data
    } else {
      message.error(response?.data?.message || "系统异常")
      return Promise.reject(response?.data)
    }
  },
  async error => {
    if (error.response.status === 401) {
      // 无感刷新token
      const refresh_token =
        window.localStorage.getItem(APP_ID + "refresh_token") ?? null
      if (!refresh_token) {
        message.warning("登录已过期，请重新登录")
        store.dispatch(changeTokenAction({ token: "" }))
        window.localStorage.removeItem(APP_ID)
        window.localStorage.removeItem(APP_ID + "refresh_token")
        window.localStorage.removeItem(APP_ID + "user_info")
        window.localStorage.removeItem(APP_ID + "org_id")
        window.localStorage.removeItem(APP_ID + "cur_id")
        window.localStorage.removeItem(APP_ID + "cur_name")
        window.localStorage.removeItem(APP_ID + "menu_list")
        if (window.location.hash.indexOf("#") > -1) {
          window.location.hash = "/login"
        } else {
          window.location.replace("/login")
        }
        return
      }
      const res = await refreshToken({ refresh_token })
      store.dispatch(changeTokenAction({ token: res.data.access_token }))
      window.localStorage.setItem(APP_ID, res.data.access_token)
      window.localStorage.setItem(
        APP_ID + "refresh_token",
        res.data.refresh_token
      )
      const info = await getUserInfo({})
      store.dispatch(changeUserInfoAction({ user_info: info.data.user_info }))
      store.dispatch(changeUserOrgIdAction({ org_id: info.data.org_id }))
      window.localStorage.setItem(
        APP_ID + "user_info",
        JSON.stringify(info.data.user_info)
      )
      window.localStorage.setItem(
        APP_ID + "org_id",
        JSON.stringify(info.data.org_id)
      )
      window.location.reload()
    } else {
      message.error("系统异常")
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export const getRequest = (url = "", data = {}) => {
  if (qs.stringify(data)) {
    url += url.includes("?")
      ? "&" + qs.stringify(data)
      : "?" + qs.stringify(data)
  }
  return instance.get(url)
}

export const postRequest = (url = "", data = {}) => {
  return instance.post(url, data)
}
