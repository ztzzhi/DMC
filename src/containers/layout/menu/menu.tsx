import React, { useEffect } from "react"
import { Menu } from "antd"
import { menuItemType } from "@/store/reducers/login"
import IconFont from "@/plugins/iconMgr"
import { useLocation, useNavigate } from "react-router-dom"
import type { MenuProps } from "antd"
//@ts-ignore
import style from "./index.module.less"
import { useAliveController } from "react-activation"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
interface IMenuItem extends menuItemType {
  onClick?: (...set: any) => any
}
type IMenuProps = MenuProps["items"]

const Index = (props: any) => {
  const { clear } = useAliveController()
  const navigate = useNavigate()

  const menuList = useSelector<RootState, menuItemType[]>(
    state => state.login.menuList
  )

  const pathname = useLocation().pathname
  const pathnameArr = pathname.split("/")
  const defaultSelectKey =
    pathnameArr.length > 3
      ? pathnameArr.slice(0, pathname.split("/").length - 1).join("/")
      : pathnameArr.join("/")
  const handleMenuList = (menuList: menuItemType[]): IMenuProps => {
    return menuList.map((item: IMenuItem) => {
      if (item.children) {
        return {
          ...item,
          children: handleMenuList(item.children),
          icon: (
            <IconFont
              type={item.icon as string}
              style={{
                marginRight: "6px",
                width: "16px",
                height: "16px",
                fontSize: "16px"
              }}
            />
          )
        }
      } else {
        return {
          ...item,
          onClick: () => {
            clear()
            item.path && navigate(item.path)
          },
          icon: (
            <IconFont
              type={item.icon as string}
              style={{
                marginRight: "6px",
                width: "16px",
                height: "16px",
                fontSize: "16px"
              }}
            />
          )
        }
      }
    })
  }
  const menuListArr = handleMenuList(menuList)

  //处理刷新后自动打开当前选项卡
  const defaultOpenKeys = "/" + useLocation().pathname.split("/")[1]

  return (
    <div className={style["left-nav"]}>
      <Menu
        defaultSelectedKeys={[defaultSelectKey || "statistics"]}
        defaultOpenKeys={[defaultOpenKeys || "statistics"]}
        mode={props.mode ? props.mode : "inline"}
        theme={props.theme ? props.theme : "light"}
        items={menuListArr}
      ></Menu>
    </div>
  )
}

export default Index
