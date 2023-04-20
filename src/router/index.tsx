import React, { lazy, Suspense } from "react"
import { useRoutes, RouteObject } from "react-router-dom"
import KeepAlive, { AliveScope } from "react-activation"
import "./index.less"
import { lazyFix } from "./fixLazyLoad"

/**
 * @rules 路由规则
 * 新增/编辑页面 使用用 add 用 ?id=xxx 进行区分是新增还是编辑（编辑需要id）
 * 详情页面 使用 detail
 */

export interface RouteObjectObj {
  caseSensitive?: boolean
  children?: RouteObjectObj[]
  component?: React.LazyExoticComponent<any>
  index?: boolean
  path?: string
  alivescope?: boolean
  keepalive?: string
}
// lazyFix的使用最好是 在layout下的child 不要给最外层加fix函数 因为每次执行fix函数都会 有固定的时长展示loading 防止加载两边
export const allRouters: RouteObjectObj[] = [
  {
    path: "",
    component: lazy(() => import("@/pages/Login"))
  },
  {
    path: "",
    component: lazy(() => import("@/containers/layout")),
    alivescope: true,
    children: [
      {
        path: "",
        component: lazy(() => lazyFix(() => import("@/pages/Usermanage")))
      },
      {
        path: "user",
        children: [
          {
            path: "userinfo",
            component: lazy(() => lazyFix(() => import("@/pages/Usermanage")))
          },
          {
            path: "roule",
            component: lazy(() => lazyFix(() => import("@/pages/Userrole")))
          },
          {
            path: "roule/edit",
            component: lazy(() => lazyFix(() => import("@/pages/Userrole/add")))
          }
        ]
      },
      {
        path: "scaffold",
        children: [
          {
            path: "menu",
            component: lazy(() => lazyFix(() => import("@/pages/Menumanage")))
          },
          {
            path: "menu/edit",
            component: lazy(() =>
              lazyFix(() => import("@/pages/Menumanage/add"))
            )
          },
          {
            path: "app",
            component: lazy(() => lazyFix(() => import("@/pages/Appmanage")))
          },
          {
            path: "app/edit",
            component: lazy(() =>
              lazyFix(() => import("@/pages/Appmanage/add"))
            )
          }
        ]
      },
      {
        path: "device",
        children: [
          {
            path: "deviceclassify",
            component: lazy(() =>
              lazyFix(() => import("@/pages/DeviceManage/DeviceClassify"))
            )
          },
          {
            path: "devicelist",
            component: lazy(() =>
              lazyFix(() => import("@/pages/DeviceManage/DeviceList"))
            )
          },
          {
            path: "devicelist/add",
            component: lazy(() =>
              lazyFix(() => import("@/pages/DeviceManage/DeviceList/add"))
            )
          },
          {
            path: "devicelist/listadd",
            component: lazy(() =>
              lazyFix(() => import("@/pages/DeviceManage/DeviceList/listadd"))
            )
          }
        ]
      },
      {
        path: "institotionmanage",
        children: [
          {
            path: "institotiolist",
            component: lazy(() =>
              lazyFix(() => import("@/pages/InstitutionManage/InstitutionList"))
            )
          },
          {
            path: "administrativemanage",
            component: lazy(() =>
              lazyFix(
                () => import("@/pages/InstitutionManage/AdministrativeManage")
              )
            )
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    component: lazy(() => import("@/pages/Login"))
  },
  {
    path: "/404",
    component: lazy(() => import("@/pages/NotFound"))
  },
  {
    path: "/401",
    component: lazy(() => import("@/pages/NotPermission"))
  },
  {
    path: "*",
    component: lazy(() => import("@/pages/NotFound"))
  }
]

const handleByUseRouter = (
  allRouters: RouteObjectObj[]
): Omit<RouteObjectObj[], "pover"> => {
  return allRouters.map(item => ({
    path: item.path,
    component: item.component,
    children: item.children ? handleByUseRouter(item.children) : undefined,
    caseSensitive: item.caseSensitive,
    index: item.index,
    alivescope: item.alivescope,
    keepalive: item.keepalive
  }))
}

const routersByUseRoutes = handleByUseRouter(allRouters)

const syncRouter = (table: RouteObjectObj[]): RouteObject[] => {
  const mRouteTable: RouteObject[] = []
  table.forEach(route => {
    mRouteTable.push({
      path: route.path,
      element: isKeepAlive(route),
      children: route.children && syncRouter(route.children)
    })
  })
  return mRouteTable
}

function isKeepAlive(route: RouteObjectObj) {
  const content: React.ReactNode = route.component && (
    <Suspense
      fallback={
        <div id="firstPage">
          <div className="first-loading-wrap">
            <div className="loading-wrap">
              <span className="dot dot-spin">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
          </div>
        </div>
      }
    >
      <route.component />
    </Suspense>
  )
  if (route.alivescope) {
    return <AliveScope>{content}</AliveScope>
  } else if (route.keepalive) {
    return <KeepAlive cacheKey={route.keepalive}>{content}</KeepAlive>
  } else {
    return content
  }
}

export default function AppRouter() {
  const routers: React.ReactElement | null = useRoutes(
    syncRouter(routersByUseRoutes)
  )
  return routers
}
