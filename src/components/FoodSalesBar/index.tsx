import React, { useEffect, useRef } from "react"
import * as echarts from "echarts"
import ReactEcharts from "echarts-for-react"
import { Row, Col } from "antd"
type EChartsOption = echarts.EChartsOption
export default function Index() {
  const echartsRef = useRef<any>()

  useEffect(() => {
    echartsRef.current.resize()
  }, [])

  const getOption = () => {
    const option: EChartsOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "20%",
          data: [10, 52, 200, 334, 390, 330, 220],
          itemStyle: {
            borderRadius: [20, 20, 0, 0],
            color: "#2C68FF"
          }
        }
      ]
    }
    return option
  }
  return (
    <Row gutter={[10, 15]}>
      <Col span={24}>
        <ReactEcharts ref={echartsRef} option={getOption()}></ReactEcharts>
      </Col>
    </Row>
  )
}
