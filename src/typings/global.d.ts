declare interface FormItemType {
  name: string
  label?: string
  required?: boolean
  message?: string
  placeholder?: string
}

// * Vite
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_API_URL: string
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_GLOB_APP_TITLE: string
  VITE_DROP_CONSOLE: boolean
  VITE_PROXY_URL: string
  VITE_BUILD_GZIP: boolean
  VITE_REPORT: boolean
}

declare type IsBool = Record<string | number | symbol, boolean>

declare type SrchData = Record<string | number | symbol, any>

declare interface SearchFormProps<T> {
  onFinish: (val: T) => void
  onReset?: () => void
}

declare interface ModalProps {
  open: boolean
  onConfirm: (vals: any) => void
  onCancel: () => void
  [k: string]: any
}

//网络请求接口返回数据
declare type Res<T> = {
  code?: number
  status?: number
  message?: string
  data: {
    lists: T[]
    total: number
    [k: string]: any
  }
  [k: string]: any
}

declare type ResData<T> = {
  lists: T[]
  total?: number
  [k: string]: any
}

declare interface Resolve {
  code?: number
  message?: string
  [k: string]: any
}
