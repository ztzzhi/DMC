import { useEffect, useState } from "react"
import { Row, Col, Card, Tooltip } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
const { Meta } = Card
import "./index.less"

export interface Iprops {
  headerTitle: string | number
  cardList: ICardList[]
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
    xl: 6,
    style: { marginBottom: 24 },
    ...props.topColResponsiveProps
  }
  return (
    <div className="CardShow">
      <div className="myheader">{props.headerTitle}</div>
      <Row gutter={24}>
        {props.cardList.map(item => {
          return (
            <Col {...topColResponsiveProps} key={item.id}>
              <Card
                loading={loading}
                bordered={false}
                extra={
                  item.isToolTip ? (
                    <Tooltip placement="top" title={item.toolTipText}>
                      <ExclamationCircleOutlined />
                    </Tooltip>
                  ) : (
                    ""
                  )
                }
              >
                <Meta title={item.content} />
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
