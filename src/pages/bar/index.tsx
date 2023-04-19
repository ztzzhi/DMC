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
      title: {
        text: "Stacked Area Chart"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        top: "40",
        align: "left"
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      grid: {
        top: "20%"
        // containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          label: {
            show: true,
            position: "top"
          },
          areaStyle: {},
          emphasis: {
            focus: "series"
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
    return option
  }
  return (
    <Row gutter={[10, 15]}>
      <Col span={12}>
        <ReactEcharts
          ref={echartsRef}
          style={{ width: "100%", height: "500px" }}
          option={getOption()}
        ></ReactEcharts>
      </Col>
      <Col span={12}>
        <div id="chartsG2"></div>
      </Col>
    </Row>
  )
}
