import React, { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { changeTokenAction, changeMenuList } from "@/store/actions/login"
import {
  changeUserInfoAction,
  changeUserOrgIdAction,
  changeSelectOrgIdAction,
  changeSelectOrgNameAction
} from "@/store/actions/user"
import { Button, Form, Input, Tabs, message, Avatar } from "antd"
import { menuItemType } from "@/store/reducers/login"
// import logo from "@/assets/images/login/logologin.png"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import "./index.less"
import { useNavigate } from "react-router-dom"
import { userLogin, getUserInfo, getMenuInfo } from "@/api/index"
import { APP_ID } from "@/config"
interface ApiForm {
  username: string
  password: string
  remember: boolean
}
const Index: React.FC = () => {
  // const token = useSelector<RootState, loginType>(state => state.login.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // if (token) {
    //   navigate(-1)
    // }
  }, [])
  const onFinish = async (val: ApiForm) => {
    try {
      setLoading(true)
      const { username, password } = val
      const res = await userLogin({ username, password })
      if (res.code === 200) {
        if (res?.data?.error_code == 500) {
          message.error("账号密码错误，请核对后重试！")
          setLoading(false)
          return
        }
        dispatch(changeTokenAction({ token: res.data.access_token }))
        window.localStorage.setItem(APP_ID, res.data.access_token)
        window.localStorage.setItem(
          APP_ID + "refresh_token",
          res.data.refresh_token
        )
        const info = await getUserInfo({})
        dispatch(changeUserInfoAction({ user_info: info.data.user_info }))
        dispatch(changeUserOrgIdAction({ org_id: info.data.org_id }))
        window.localStorage.setItem(
          APP_ID + "user_info",
          JSON.stringify(info.data.user_info)
        )
        window.localStorage.setItem(
          APP_ID + "org_id",
          JSON.stringify(info.data.org_id)
        )
        dispatch(
          changeSelectOrgIdAction({ cur_id: info.data.org_id?.[0]?.["id"] })
        )
        window.localStorage.setItem(
          APP_ID + "cur_id",
          JSON.stringify(info.data.org_id?.[0]?.["id"])
        )
        dispatch(
          changeSelectOrgNameAction({
            cur_name: info.data.org_id?.[0]?.["name"]
          })
        )
        window.localStorage.setItem(
          APP_ID + "cur_name",
          JSON.stringify(info.data.org_id?.[0]?.["name"])
        )
        const menuInfo = await getMenuInfo({})
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
        window.localStorage.setItem(
          APP_ID + "menu_list",
          JSON.stringify(menuList)
        )
        dispatch(changeMenuList({ menuList }))
        if (res?.data?.access_token && menuInfo?.data?.menu?.length) {
          navigate("/statistics")
          message.success("登录成功")
        } else {
          message.warning("请联系管理员配置该账号功能权限！")
          setLoading(false)
        }
      }
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="login_page">
        <div className="login_header">
          {/* <img src={logo} alt="" /> */}
          <Avatar size={65} style={{ marginRight: 10 }}>
            Logo
          </Avatar>
          <span>XX科技 智慧助餐系统</span>
        </div>

        <Tabs
          defaultActiveKey="1"
          centered
          items={[
            {
              label: "账号密码登录",
              key: "1",
              children: (
                <>
                  <div className="box_center">
                    <Form
                      name="normal_login"
                      className="login-form"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                    >
                      <Form.Item
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "请输入用户名!"
                          }
                        ]}
                      >
                        <Input
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="用户名"
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "请输入密码!"
                          }
                        ]}
                      >
                        <Input
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          type="password"
                          placeholder="密码"
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          size="large"
                          loading={loading}
                        >
                          登录
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </>
              )
            }
          ]}
        />
      </div>
    </>
  )
}

export default Index
