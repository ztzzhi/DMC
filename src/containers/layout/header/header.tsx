import React from "react"
import { UserOutlined, LogoutOutlined } from "@ant-design/icons"
import "./index.less"
import { Dropdown, Avatar, Modal } from "antd"
import logo from "./logo.png"
import header from "@/assets/images/login/header.png"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { changeTokenAction } from "@/store/actions/login"

import { RootState } from "@/store"
import { IUserInfo } from "@/store/reducers/user"
import { APP_ID } from "@/config"
const { confirm } = Modal
const Header = (props: any) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user_info = useSelector<RootState, IUserInfo>(
    state => state.user.user_info
  )
  const items = [
    {
      key: "1",
      label: (
        <div onClick={() => handleRemoveLogin()}>
          <LogoutOutlined />
          <span style={{ marginLeft: 10 }}>退出登录</span>
        </div>
      )
    }
  ]
  const handleRemoveLogin = () => {
    confirm({
      content: "确定要退出登录吗？",
      onOk: () => {
        window.localStorage.removeItem("deviceType")
        window.localStorage.removeItem(APP_ID)
        window.localStorage.removeItem(APP_ID + "refresh_token")
        window.localStorage.removeItem(APP_ID + "user_info")
        window.localStorage.removeItem(APP_ID + "menu_list")
        dispatch(changeTokenAction({ token: "" }))
        navigate("/login")
      }
    })
  }

  return (
    <div className="headerText">
      <div className="centerLeft">
        <img src={logo} alt="" />
        <span>服务中心</span>
      </div>
      <div className="centerCenter">{props.children}</div>
      <div className="action centerRight">
        <Dropdown menu={{ items }} placement="bottom">
          <div className="header_user">
            <Avatar src={header} size={26} icon={<UserOutlined />} />
            <span
              style={{
                verticalAlign: "middle",
                color: "#fff",
                marginLeft: "8px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {user_info?.name}
            </span>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
