import { useEffect, useState } from "react"
import { Row, Col, Card, Modal, Button, Dropdown, Image } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import useMealTime from "@/hooks/useMealTime"
import "./index.less"
const { confirm } = Modal
export interface Iprops {
  headerTitle: string | number
  cardList: ICardList[]
  delCallback: (...set: any) => void
  setTimeCallback: (...set: any) => void
  goStockRoom: (...set: any) => void
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
  [k: string]: any
}

export default function TableComponent(props: Iprops) {
  const [loading, setLoading] = useState(true)
  const [menuID, setMenuID] = useState()
  const mealTime = useMealTime()
  const itemArr = mealTime?.map((item: any) => ({
    key: item?.id,
    label: (
      <a onClick={() => props.setTimeCallback(menuID, item.id)}>{item?.name}</a>
    )
  }))
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])
  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 8,
    xl: 6,
    style: { marginBottom: 24 },
    ...props.topColResponsiveProps
  }
  return (
    <div className="CardFood">
      <div className="myheader">{props.headerTitle}</div>
      <Row gutter={10}>
        {props.cardList.map(item => {
          return (
            <Col {...topColResponsiveProps} key={item.id}>
              <Card
                loading={loading}
                hoverable
                actions={[
                  <Dropdown
                    key={"select"}
                    menu={{ items: itemArr }}
                    placement="bottomLeft"
                    arrow
                    onOpenChange={() => setMenuID(item?.menu_id)}
                  >
                    <Button type="link">用餐时间</Button>
                  </Dropdown>,
                  <Button
                    onClick={() => props.goStockRoom(item?.id, item?.menu_id)}
                    type="link"
                    key={"del"}
                  >
                    出入库
                  </Button>,
                  <Button
                    type="link"
                    danger
                    key={"del"}
                    onClick={() => {
                      confirm({
                        title: "确定删除此菜品吗?",
                        icon: <ExclamationCircleOutlined />,
                        onOk: () => props.delCallback(item?.menu_id),
                        onCancel() {
                          console.log("Cancel")
                        }
                      })
                    }}
                  >
                    删除
                  </Button>
                ]}
              >
                <div className="main_content">
                  <div className="main_left">
                    <Image
                      src={item.cover_img}
                      fallback={require("@/assets/images/moren.png")}
                    />
                  </div>
                  <div className="mian_right">
                    <div className="title">{`${item?.name} (${
                      item?.taste === "" ? "长期" : "当日"
                    })`}</div>
                    <div className="price">{"菜品价格：" + item.price}</div>
                    <div className="kucun">{"库存：" + item.stock}</div>
                  </div>
                </div>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
