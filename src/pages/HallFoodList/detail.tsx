import React, { useEffect, useState } from "react"
import { Steps, Space, Button } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import "./detail.less"
import Descriptions from "@/components/Descriptions"
import { getOrderDetail } from "@/api/hallfoodlist"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { payTypeMap, statusMap, orderTypeMap } from "./columns"
import DishesTable from "./DishesTable"

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const id = query.get("id")
  const cur_id = useSelector<RootState, number>(state => state.user.cur_id)
  const [detail, setDetail] = useState<any>({})
  const [stepsItems, setStepsItems] = useState<any>([
    {
      title: "创建订单",
      description: ""
    },
    {
      title: "支付订单",
      description: ""
    },
    {
      title: "订单完成",
      description: ""
    }
  ])

  useEffect(() => {
    if (id) {
      getDetail()
    }
  }, [])

  const getDetail = async () => {
    const res = await getOrderDetail({ id, org_id: cur_id })
    setDetail(res?.data)
    const stepsItemsArr = [...stepsItems]
    res?.data?.order_logs?.forEach((item: any, index: number) => {
      stepsItemsArr[index].description = item.time
      if (item?.name) {
        stepsItemsArr[index].title = item.name
      }
    })
    setStepsItems([...stepsItemsArr])
  }

  return (
    <div className="hallfood_detail">
      <PageContainer
        title="订单详情"
        footer={
          <Space>
            <Button onClick={() => navigate(-1)}>返回</Button>
          </Space>
        }
      >
        <Descriptions
          title="订单信息"
          list={[
            {
              label: "订单ID",
              content: detail?.order_items?.[0]?.order_id,
              id: 1
            },
            { label: "点餐人", content: detail?.user?.name, id: 2 },
            { label: "点餐方式", content: detail?.buy_type, id: 3 },
            { label: "订单状态", content: statusMap[detail?.status], id: 4 },
            { label: "支付方式", content: detail?.pay_type, id: 5 },
            {
              label: "订单类型",
              content: orderTypeMap[detail?.order_type],
              id: 6
            },
            { label: "下单时间", content: detail?.created_at, id: 7 }
          ]}
        />
        <div className="content_box">
          <div className="content_title">订单商品</div>
          <DishesTable detail={detail} />
        </div>

        <div className="content_box">
          <div className="content_title">订单进度</div>
          <Steps
            current={detail?.order_logs?.length - 1 || 0}
            items={stepsItems}
          />
        </div>
      </PageContainer>
    </div>
  )
}

export default Index
