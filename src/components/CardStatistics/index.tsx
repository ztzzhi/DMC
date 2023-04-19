import { useEffect, useState } from "react"
import { Row, Col, Card, Tooltip } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import orderPng from "@/assets/images/statistics/dingdan.png"
import moneyPng from "@/assets/images/statistics/qian.png"
import moneyPng2 from "@/assets/images/statistics/qian2.png"
import zongPng from "@/assets/images/statistics/zong.png"
import vipPng from "@/assets/images/statistics/guiyuan.png"
const { Meta } = Card
import "./index.less"

export interface Iprops {
  headerTitle: string | number
  topColResponsiveProps?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    style?: any
  }
}
export interface ICardList {
  title: string
  content: string | React.ReactElement
  isToolTip?: boolean
  toolTipText?: string
  id: string | number
}

export default function TableComponent(props: Iprops) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])
  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
    style: { marginBottom: 24 },
    ...props.topColResponsiveProps
  }
  return (
    <div className="CardStatistics">
      <div className="myheader">{props.headerTitle}</div>
      <Row>
        <Col span={18}>
          <Row gutter={5}>
            <Col {...topColResponsiveProps}>
              <Card
                className="cardStyle"
                loading={loading}
                bordered={false}
                hoverable
              >
                <div className="cardmain" style={{ background: "#89D098" }}>
                  <div className="imgbox">
                    <img className="zong_png_image" src={orderPng} alt="" />
                  </div>
                  <div className="mainright">
                    <div className="num">511</div>
                    <div className="text">食堂订单总数</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card
                className="cardStyle"
                loading={loading}
                bordered={false}
                hoverable
              >
                <div className="cardmain" style={{ background: "#38C1CF" }}>
                  <div className="imgbox">
                    <img className="money_png_image" src={moneyPng2} alt="" />
                  </div>
                  <div className="mainright">
                    <div className="num">60698</div>
                    <div className="text">食堂总营业额</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card
                className="cardStyle"
                loading={loading}
                bordered={false}
                hoverable
              >
                <div className="cardmain" style={{ background: "#A989EE" }}>
                  <div className="imgbox">
                    <img className="zong_png_image" src={zongPng} alt="" />
                  </div>
                  <div className="mainright">
                    <div className="num">2098</div>
                    <div className="text">补贴订单总数</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col {...topColResponsiveProps}>
              <Card
                className="cardStyle"
                loading={loading}
                bordered={false}
                hoverable
              >
                <div className="cardmain" style={{ background: "#FFA63D" }}>
                  <div className="imgbox">
                    <img className="money_png_image" src={moneyPng} alt="" />
                  </div>
                  <div className="mainright">
                    <div className="num">14018</div>
                    <div className="text">补贴总金额</div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={6} className="statisticsCardVertical">
          <Card
            className="cardStyle cardStyleSpec"
            loading={loading}
            bordered={false}
            hoverable
          >
            <div
              className="cardmain sepcialCardVertical"
              style={{ background: "#2C68FF" }}
            >
              <div className="imgbox">
                <img className="vip_png_image" src={vipPng} alt="" />
              </div>
              <div className="mainright">
                <div className="num">244</div>
                <div className="text">会员总数</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
