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
    path: "/",
    component: lazy(() => import("@/containers/layout")),
    alivescope: true,
    children: [
      {
        path: "",
        component: lazy(() => lazyFix(() => import("@/pages/Statistics")))
      },
      {
        path: "/statistics",
        component: lazy(() => lazyFix(() => import("@/pages/Statistics")))
      },
      {
        path: "user",
        children: [
          {
            path: "memberlist",
            component: lazy(() => lazyFix(() => import("@/pages/MemberList")))
          },
          {
            path: "memberlist/add",
            component: lazy(() =>
              lazyFix(() => import("@/pages/MemberList/add"))
            )
          },
          {
            path: "memberlist/record",
            component: lazy(() =>
              lazyFix(() => import("@/pages/MemberList/record"))
            )
          },
          {
            // keepalive: "stafflist",
            path: "stafflist",
            component: lazy(() => lazyFix(() => import("@/pages/StaffList")))
          },
          {
            path: "stafflist/add",
            component: lazy(() =>
              lazyFix(() => import("@/pages/StaffList/operation"))
            )
          }
        ]
      },

      {
        path: "order",
        children: [
          {
            path: "hallfoodlist",
            component: lazy(() => lazyFix(() => import("@/pages/HallFoodList")))
          },
          {
            path: "hallfoodlist/detail",
            component: lazy(() =>
              lazyFix(() => import("@/pages/HallFoodList/detail"))
            )
          },
          {
            path: "subsidyrules",
            component: lazy(() => lazyFix(() => import("@/pages/SubsidyRules")))
          },
          {
            path: "subsidytime",
            component: lazy(() => lazyFix(() => import("@/pages/SubsidyTime")))
          }
        ]
      },
      {
        path: "menu",
        children: [
          {
            path: "weeklymenu",
            component: lazy(() => lazyFix(() => import("@/pages/WeeklyMenu")))
          },
          {
            path: "weeklymenu/add",
            component: lazy(() =>
              lazyFix(() => import("@/pages/WeeklyMenu/add"))
            )
          },
          {
            path: "weeklymenu/stockroom",
            component: lazy(() =>
              lazyFix(() => import("@/pages/WeeklyMenu/stockroom"))
            )
          },
          {
            path: "foodmgr",
            component: lazy(() => lazyFix(() => import("@/pages/FoodMgr")))
          },
          {
            path: "foodmgr/add",
            component: lazy(() => lazyFix(() => import("@/pages/FoodMgr/add")))
          },
          {
            path: "foodmgr/detail",
            component: lazy(() =>
              lazyFix(() => import("@/pages/FoodMgr/detail"))
            )
          },
          {
            path: "dishesclassify",
            component: lazy(() =>
              lazyFix(() => import("@/pages/DishesClassify"))
            )
          }
        ]
      },

      {
        path: "/yanglao",
        component: lazy(() => lazyFix(() => import("@/pages/Template")))
      },

      {
        path: "/canteenmag",
        component: lazy(() => lazyFix(() => import("@/pages/CanteenMag")))
      },

      {
        path: "/connectlogs",
        component: lazy(() => lazyFix(() => import("@/pages/ConnectLogs")))
      },
      {
        path: "/canteenmgrroot",
        component: lazy(() => lazyFix(() => import("@/pages/CanteenMgrRoot")))
      },
      {
        path: "/canteenmgrroot/add",
        component: lazy(() =>
          lazyFix(() => import("@/pages/CanteenMgrRoot/add"))
        )
      },
      {
        path: "/devicemgrroot",
        component: lazy(() => lazyFix(() => import("@/pages/DeviceMgrRoot")))
      },
      {
        path: "/devicemgrroot/add",
        component: lazy(() =>
          lazyFix(() => import("@/pages/DeviceMgrRoot/add"))
        )
      },
      {
        path: "/rolemgrroot",
        component: lazy(() => lazyFix(() => import("@/pages/RoleMgrRoot")))
      },
      {
        path: "/rolemgrroot/add",
        component: lazy(() => lazyFix(() => import("@/pages/RoleMgrRoot/add")))
      }
    ]
  },
  { path: "/bar", component: lazy(() => lazyFix(() => import("@/pages/bar"))) },
  {
    path: "/login",
    component: lazy(() => import("@/pages/Login"))
  },
  {
    path: "/404",
    component: lazy(() => import("@/pages/NotFound"))
  },
  {
    path: "/403",
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
    <Suspense fallback={<div id="firstPage"></div>}>
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
