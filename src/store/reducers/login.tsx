import { APP_ID } from "@/config"
import { TOKEN_CHANGE, MENULIST } from "../constant"

export interface loginType {
  token: string | null
  menuList: menuItemType[]
}
export interface menuItemType {
  label: string
  key: string
  icon: string
  path?: string
  children?: menuItemType[]
}

const initState: loginType = {
  token: window.localStorage.getItem(APP_ID)
    ? window.localStorage.getItem(APP_ID)
    : null,
  menuList: window.localStorage.getItem(APP_ID + "menu_list")
    ? JSON.parse(window.localStorage.getItem(APP_ID + "menu_list")!)
    : []
}

export default function loginReducer(preState = initState, action: any) {
  const { type, data } = action
  let newState
  switch (type) {
    case TOKEN_CHANGE:
      newState = { ...preState, token: data.token }
      break
    case MENULIST:
      newState = { ...preState, menuList: data.menuList }
      break
    default:
      newState = preState
      break
  }
  return newState
}
