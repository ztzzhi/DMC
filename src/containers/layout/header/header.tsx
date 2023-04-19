import React from "react"
import {
  UserOutlined,
  LogoutOutlined,
  InteractionOutlined
} from "@ant-design/icons"
import "./index.less"
import { Dropdown, Avatar, Modal } from "antd"
import logo from "@/assets/images/login/logo.png"
import header from "@/assets/images/login/header.png"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { changeTokenAction } from "@/store/actions/login"
import {
  changeSelectOrgIdAction,
  changeSelectOrgNameAction
} from "@/store/actions/user"
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
  const org_id = useSelector<RootState, { id: string; name: string }[]>(
    state => state.user.org_id
  )
  const cur_id = useSelector<RootState, number>(state => state.user.cur_id)
  const cur_name = useSelector<RootState, string>(state => state.user.cur_name)
  const orgArr = org_id.map((item, index) => {
    return {
      key: item.id,
      label: (
        <div onClick={() => handleSelectOrgId(item.id, item.name)}>
          {item.name}
        </div>
      )
    }
  })
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
        window.localStorage.removeItem(APP_ID)
        window.localStorage.removeItem(APP_ID + "refresh_token")
        window.localStorage.removeItem(APP_ID + "user_info")
        window.localStorage.removeItem(APP_ID + "org_id")
        window.localStorage.removeItem(APP_ID + "cur_id")
        window.localStorage.removeItem(APP_ID + "cur_name")
        window.localStorage.removeItem(APP_ID + "menu_list")
        dispatch(changeTokenAction({ token: "" }))
        navigate("/login")
      }
    })
  }

  const handleSelectOrgId = (item: string, name: string) => {
    window.localStorage.setItem(APP_ID + "cur_id", JSON.stringify(item))
    window.localStorage.setItem(APP_ID + "cur_name", JSON.stringify(name))
    dispatch(changeSelectOrgIdAction({ cur_id: item }))
    dispatch(changeSelectOrgNameAction({ cur_name: name }))
    window.location.reload()
  }
  return (
    <div className="headerText">
      <div className="centerLeft">
        {/* <img src={logo} alt="" /> */}
        <Avatar size={50} style={{ marginRight: 10 }}>
          Logo
        </Avatar>
        <span>智慧助餐管理系统</span>
      </div>
      <div className="centerCenter">{props.children}</div>
      <div className="action centerRight">
        <Dropdown
          menu={{
            items: orgArr,
            selectable: true,
            defaultSelectedKeys: [cur_id + ""]
          }}
          placement="bottom"
        >
          <div className="header_user">
            <InteractionOutlined />
            <span className="text_overflow">
              {cur_name ? cur_name : "我的食堂"}
            </span>
          </div>
        </Dropdown>
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
