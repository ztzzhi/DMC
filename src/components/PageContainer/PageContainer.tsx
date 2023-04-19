import React from "react"
//@ts-ignore
import style from "./index.module.less"
interface Iprops {
  children?: React.ReactNode
  title: string | React.ReactNode
  extra?: string | React.ReactNode
  footer?: string | React.ReactNode
}
export default function PageContainer(props: Iprops) {
  return (
    <>
      <div className={style.title}>
        <div className={style.headerLeft}>{props?.title || "我是标题"}</div>
        <div className={style.headerRight}>{props?.extra}</div>
      </div>
      {props?.children}
      <div className={style.footer}>{props?.footer}</div>
    </>
  )
}
