import { Descriptions, Typography } from "antd"
import "./index.less"
interface Iprops {
  title?: string
  list: listArrType[]
  column?: columnType
}

interface listArrType {
  label: string
  content: string
  labelStyle?: any
  [propName: string]: any
}

type columnEnum = 5 | 4 | 3 | 2 | 1

interface columnType {
  xxl?: columnEnum
  xl?: columnEnum
  lg?: columnEnum
  md?: columnEnum
  sm?: columnEnum
  xs?: columnEnum
}

export default function DescriptionsComponent(props: Iprops) {
  return (
    <div className="descriptions">
      <Descriptions
        title={props.title ? props.title : ""}
        column={
          props.column
            ? props.column
            : { xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }
        }
      >
        {props.list.map(item => {
          return (
            <Descriptions.Item
              className="descriptions_item"
              style={{ paddingRight: 10 }}
              labelStyle={item.labelStyle ? item.labelStyle : {}}
              key={item.label}
              label={item.label}
            >
              {item.content}
            </Descriptions.Item>
          )
        })}
      </Descriptions>
    </div>
  )
}
