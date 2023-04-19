import React, { useState, useEffect } from "react"
import { Row, Col } from "antd"
import CardShow, { ICardList } from "@/components/CardShow"
import CardStatistics from "@/components/CardStatistics"
import CardStatisticsRight from "@/components/CardStatisticsRight"
import FoodSalesBar from "@/components/FoodSalesBar"
const Index: React.FC = () => {
  const [cardList, setCardList] = useState<ICardList[]>([])

  useEffect(() => {
    setCardList([
      {
        id: 1,
        title: "会员总数",
        isToolTip: true,
        toolTipText: "你好啊",
        content: "1233"
      },
      {
        id: 2,
        title: "我是一",
        isToolTip: false,
        toolTipText: "你好啊",
        content: "1231"
      },
      {
        id: 3,
        title: "我是一",
        isToolTip: false,
        toolTipText: "你好啊",
        content: "1231"
      },
      {
        id: 4,
        title: "我是一",
        isToolTip: false,
        toolTipText: "你好啊",
        content: "1231"
      },
      {
        id: 5,
        title: "我是一",
        isToolTip: false,
        toolTipText: "你好啊",
        content: "1231"
      },
      {
        id: 6,
        title: "我是一",
        isToolTip: false,
        toolTipText: "你好啊",
        content: "1231"
      }
    ])
  }, [])
  const ColResponsive = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 12,
    xxl: 12,
    style: { marginBottom: 24 }
  }

  return (
    <div className="Statistics">
      <Row gutter={10}>
        <Col {...ColResponsive}>
          <CardStatistics headerTitle="营业汇总"></CardStatistics>
        </Col>
        <Col {...ColResponsive}>
          <CardStatisticsRight headerTitle="今日营业"></CardStatisticsRight>
        </Col>
      </Row>

      <CardShow
        headerTitle="菜品销量"
        topColResponsiveProps={{
          xs: 24,
          sm: 24,
          md: 24,
          lg: 24,
          xl: 24
        }}
        cardList={[
          {
            id: 1,
            title: "菜品月销量",
            isToolTip: false,
            content: <FoodSalesBar></FoodSalesBar>
          }
        ]}
      ></CardShow>
    </div>
  )
}

export default Index
