import type { ColumnsType } from "antd/es/table"
import { Table, Typography } from "antd"
interface DataType {
  key: string
  name: string
  borrow: number
  repayment: number
}
const DishesTable = (props: any) => {
  const { detail } = props
  const columns: ColumnsType<DataType> = [
    {
      key: "order_id",
      title: "菜品ID",
      dataIndex: "order_id"
    },
    {
      title: "菜品名称",
      dataIndex: "dishes_name",
      key: "dishes_name"
    },
    {
      key: "price",
      title: "单价",
      dataIndex: "price",
      render: price => "￥" + price
    },
    {
      title: "数量",
      key: "nums",
      dataIndex: "nums"
    },
    {
      title: "金额",
      key: "total_price",
      dataIndex: "total_price"
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={detail?.order_items}
      pagination={false}
      size={"middle"}
      bordered
      summary={(pageData: any) => {
        let totalNum = 0

        pageData.forEach(({ nums = 1, total_price = 0 }: any) => {
          totalNum += nums * 1
        })

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Typography.Text>--</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Typography.Text>--</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Typography.Text>{totalNum}</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                <Typography.Text>
                  ￥{detail?.total_money || "0.00"}
                </Typography.Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>

            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>补贴金额</Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={3}>
                <Typography.Text>---</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} colSpan={1}>
                <Typography.Text>
                  ￥{detail?.discounts_money || "0.00"}
                </Typography.Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>支付金额</Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={3}>
                <Typography.Text>---</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={1}>
                <Typography.Text>
                  ￥{detail?.pay_money || "0.00"}
                </Typography.Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        )
      }}
    />
  )
}

export default DishesTable
