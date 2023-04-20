import React, { useEffect, useState } from "react"

import { useSelector, useDispatch } from "react-redux"
import { changeTokenAction, changeMenuList } from "@/store/actions/login"
import { changeUserInfoAction } from "@/store/actions/user"
import { Button, Form, Input, Checkbox, Tabs, message } from "antd"
import { RootState } from "@/store"
import { loginType, menuItemType } from "@/store/reducers/login"
import logo from "@/assets/images/login/logologin.png"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import "./index.less"
import { useNavigate, useLocation } from "react-router-dom"
import {
  reqAuth,
  getAdminRoute,
  getUserInfo,
  getMenuInfo,
  userLogin
} from "@/api/index"
import { APP_ID, BASE_URL, REDIRECT_URL } from "../../config"

interface ApiForm {
  username: string
  password: string
  remember: boolean
}
const Index: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const urlArr = window.location.search.slice(1).split("&")
  const codeArr = urlArr.filter(item => item.indexOf("code") > -1)
  const code = (codeArr && codeArr.length && codeArr[0].split("=")[1]) || null

  useEffect(() => {
    if (code == null) {
      window.location.href =
        BASE_URL +
        "/api/user/public/authorize?client_id=" +
        APP_ID +
        "&response_type=code&redirect_uri=" +
        REDIRECT_URL +
        "&scope=dev,Iot&state=state"
    } else {
      GetToken(code)
    }
  }, [])

  const GetToken = async (code: any) => {
    try {
      setLoading(true)
      const res = await reqAuth(code, APP_ID, REDIRECT_URL)
      console.log(res, "res")
      if (res.code === 200) {
        message.success(`登录成功`)
        dispatch(changeTokenAction({ token: res.data.access_token }))
        window.localStorage.setItem(APP_ID, res.data.access_token)
        window.localStorage.setItem(
          APP_ID + "refresh_token",
          res.data.refresh_token
        )
        const menuInfo = await getMenuInfo({})
        dispatch(changeUserInfoAction({ user_info: menuInfo.data.user }))
        window.localStorage.setItem(
          APP_ID + "user_info",
          JSON.stringify(menuInfo.data.user)
        )
        const handleMenuList = (menuList: menuItemType[]): menuItemType[] => {
          return menuList.map((item: any) => {
            if (item.children && item.children.length > 0) {
              return {
                label: item.title,
                key: item.path,
                icon: item.menu_icon,
                path: item.path,
                children: handleMenuList(item.children)
              }
            } else {
              return {
                label: item.title,
                key: item.path,
                icon: item.menu_icon,
                path: item.path
              }
            }
          })
        }

        const menuList = handleMenuList(menuInfo?.data?.menu || [])
        console.log(menuList, "menuList")
        window.localStorage.setItem(
          APP_ID + "menu_list",
          JSON.stringify(menuList)
        )
        dispatch(changeMenuList({ menuList }))

        const getDeepArrItemOne = (menuitem: any): any => {
          let item = menuitem
          if (!(item.children && item.children.length)) return item
          item = item.children[0]
          return getDeepArrItemOne(item)
        }
        if (menuList.length > 0) {
          const rrr = getDeepArrItemOne(menuList[0])
          window.history.replaceState(
            null,
            "",
            window.location.pathname +
              "#" +
              (rrr.path[0] === "/" ? rrr.path : "/" + rrr.path)
          )
          window.location.reload()
        } else {
          message.error("请联系管理员配置权限")
        }
      }
    } catch (error) {
      setLoading(false)
    }
  }
  return <></>
}

export default Index
