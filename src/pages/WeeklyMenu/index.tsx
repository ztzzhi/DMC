import React, { useState, useEffect } from "react"
import { Modal, Tabs, Space, Button, Spin, message } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import { ExclamationCircleOutlined } from "@ant-design/icons"
const { confirm } = Modal
import "./index.less"
import { useNavigate } from "react-router-dom"
import CardFood from "@/components/CardFood"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import {
  getList,
  getMealTime,
  editDishesMealTime,
  deleteDishes,
  deleAllDishes
} from "@/api/weeklyMenu"
const Index: React.FC = () => {
  const orgID = useSelector<RootState, any>(state => state.user.cur_id)
  const week = useSelector<RootState, any>(state => state.seleWeek.week)
  const dispatch = useDispatch()
  const [foodnum, setFoodnum] = useState(0) //菜品数
  const [activeKey, setActiveKey] = useState(week)
  const navigate = useNavigate()
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    getData()
  }, [activeKey])
  async function getData() {
    setLoading(true)
    const timeRes: Resolve = await getMealTime({ id: orgID })
    if (timeRes?.code !== 200) return
    const requestArr = timeRes?.data?.map((item: any) =>
      getList({
        org_id: orgID,
        day_of_week: activeKey,
        time_quantum: item?.id
      })
    )
    const data: any = []
    for await (const res of requestArr) {
      res?.code === 200 && data.push(res?.data)
    }
    const newData = timeRes?.data?.map((item: any, idx: number) => ({
      ...item,
      lists: data?.[idx]
    }))

    let fooDnum = 0
    for (let i = 0; i < data?.length; i++) {
      if (data[i].length) {
        fooDnum += data[i].length
      }
    }

    setFoodnum(fooDnum)
    setData(newData)
    setLoading(false)
  }

  const weeklyMap: Record<string, string> = {
    1: "周一",
    2: "周二",
    3: "周三",
    4: "周四",
    5: "周五",
    6: "周六",
    7: "周日"
  }

  async function delCallback(id: string) {
    const res: Resolve = await deleteDishes({ org_id: orgID, id })
    if (res?.code === 200) {
      message.success("删除成功")
      getData()
    }
  }

  //修改菜品用餐时间
  async function setTimeCallback(menuID: string, time_quantum: string) {
    const res: Resolve = await editDishesMealTime({
      org_id: orgID,
      id: menuID,
      time_quantum
    })
    if (res?.code === 200) {
      message.success("操作成功")
      getData()
    }
  }

  const handleClearAll = () => {
    confirm({
      title: "确定清除所有菜品吗?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const res: Resolve = await deleAllDishes({
          org_id: orgID,
          day_of_week: activeKey
        })
        if (res?.code === 200) {
          message.success("操作成功")
          getData()
        }
      }
    })
  }

  const handleAdd = (type: number) => {
    navigate("add", { state: { type, org_id: orgID, day_of_week: activeKey } })
  }

  return (
    <div className="weekly_menu">
      <>
        <Tabs
          className="tabs_spec"
          defaultActiveKey={activeKey}
          onChange={key => {
            dispatch({
              type: "seleWeek",
              week: key
            })
            setFoodnum(0)
            setActiveKey(key)
          }}
          tabPosition="top"
          items={Object.keys(weeklyMap).map(key => ({
            label: weeklyMap[key],
            key
          }))}
        />
        <PageContainer
          title={"菜品数" + "（" + foodnum + "）"}
          extra={
            <Space wrap>
              <Button
                type="primary"
                onClick={() => handleAdd(1)}
                style={{ margin: "10px 0" }}
              >
                添加长期菜品
              </Button>
              <Button
                type="primary"
                onClick={() => handleAdd(0)}
                style={{ margin: "10px 0" }}
              >
                添加当日菜品
              </Button>
              <Button
                onClick={handleClearAll}
                style={{ margin: "10px 0" }}
                danger
                type="dashed"
              >
                一键清除
              </Button>
            </Space>
          }
        >
          {!loading &&
            data?.map((item: any) => {
              return (
                <CardFood
                  key={item?.id}
                  headerTitle={
                    item?.lists.length > 0
                      ? `${item?.name} (${item?.str_time} - ${item?.end_time})`
                      : ""
                  }
                  cardList={item?.lists}
                  delCallback={delCallback}
                  setTimeCallback={setTimeCallback}
                  goStockRoom={(id, menuID) =>
                    navigate("stockroom", {
                      state: { product_id: id, menu_id: menuID, org_id: orgID }
                    })
                  }
                />
              )
            })}
          <Spin
            size="large"
            style={{ width: "100%", height: "25vh", marginTop: "15vh" }}
            spinning={loading}
            tip="Loading..."
          />
        </PageContainer>
      </>
    </div>
  )
}

export default Index
