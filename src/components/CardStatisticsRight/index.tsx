import { useEffect, useState } from "react"
import { Row, Col, Card, Tooltip, Skeleton } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
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
  return (
    <div className="CardStatisticsRight">
      <div className="myheader">{props.headerTitle}</div>
      <Skeleton
        loading={loading}
        paragraph={{
          rows: 8
        }}
      >
        <Card bordered={false}>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">145</div>
              <div className="text">食堂订单数</div>
            </div>
          </Card.Grid>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">1390</div>
              <div className="text">食堂营业额(元)</div>
            </div>
          </Card.Grid>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">10</div>
              <div className="text">退款订单数</div>
            </div>
          </Card.Grid>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">300</div>
              <div className="text">退款金额(元)</div>
            </div>
          </Card.Grid>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">31</div>
              <div className="text">补贴订单数</div>
            </div>
          </Card.Grid>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">11</div>
              <div className="text">现金订单数</div>
            </div>
          </Card.Grid>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">30</div>
              <div className="text">会员订单数</div>
            </div>
          </Card.Grid>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">10</div>
              <div className="text">游客订单数</div>
            </div>
          </Card.Grid>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">590</div>
              <div className="text">补贴金额(元)</div>
            </div>
          </Card.Grid>
          <Card.Grid className="cardgrid">
            <div className="mainContent">
              <div className="num">490</div>
              <div className="text">现金收款(元)</div>
            </div>
          </Card.Grid>
        </Card>
      </Skeleton>
    </div>
  )
}
