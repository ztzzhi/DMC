import { useLocation, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { menuItemType } from "@/store/reducers/login"
const poverArr = [] as menuItemType[]
export default function routerBefore({ children }: any) {
  const location = useLocation()
  const pathnameArr = location?.pathname
  const menuList = useSelector<RootState, menuItemType[]>(
    state => state.login.menuList
  )
  const handleMenuList = (menuList: menuItemType[]) => {
    return menuList.map(item => {
      if (item.children && item.children.length > 0) {
        handleMenuList(item.children)
      } else {
        if (item.path && pathnameArr && pathnameArr.indexOf(item.path) > -1) {
          poverArr.push(item)
        }
      }
    })
  }
  poverArr.length = 0
  handleMenuList(menuList || [])
  if (poverArr.length === 0 && menuList.length !== 0) {
    // return <Navigate to={"/401"} replace></Navigate>
    return <>{children}</>
  } else {
    return <>{children}</>
  }
}
