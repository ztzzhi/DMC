//服务地址

const env = import.meta.env.MODE

export const BASE_URL =
  env == "production" ? "https://yiy-tech.agebbs.cn/" : "http://127.0.0.1:3000"

//脚手架地址
export const SCAFFOLD_ADDRESS = "http://127.0.0.1:3000"
//跳转地址
export const REDIRECT_URL =
  // eslint-disable-next-line no-undef
  env == "production" ? "https://yiy-tech.agebbs.cn/" : "http://127.0.0.1:3000"
//脚手架端口
export const SCAFFOLD_PORT = 9967
//路由模式
export const ROUTE_TYPE = "browser"
//名称
export const BASE_TITLE = "服务中心"
//应用id
export const APP_ID = "8dfc5fa6-9654-472c-a97f-2342b3ad7563"
//应用请求标识
export const REQUEST_TAG = "user"
