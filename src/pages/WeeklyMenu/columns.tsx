import { Space, Button, Image } from "antd"
import type { ColumnsType } from "antd/lib/table"

interface IDataSource {
  name: string
  register_funds: string
  acreage: string
  register_address: string
  company_address: string
  afunction: string
  bfunction: string
  cfunction: string
}

export function useColumnsAdd(props: any) {
  const TableColumn: ColumnsType<IDataSource> = [
    {
      title: "ID",
      align: "center",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "封面",
      align: "center",
      dataIndex: "cover_img",
      key: "cover_img",
      render: src => (
        <Image
          style={{ maxHeight: 100 }}
          src={src}
          fallback={require("@/assets/images/moren.png")}
        />
      )
    },
    {
      title: "菜品名称",
      align: "center",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "菜品价格",
      align: "center",
      dataIndex: "price",
      key: "price",
      render: price => <>￥{price}</>
    },
    {
      title: "库存",
      align: "center",
      dataIndex: "stock",
      key: "stock"
    },
    {
      title: "上下架",
      align: "center",
      dataIndex: "status",
      key: "status",
      render: status => (status ? "上架" : "下架")
    },
    {
      title: "操作",
      align: "center",
      key: "oper",
      fixed: "right",
      render: data => {
        return (
          <div>
            <Space wrap>
              <Button type="link" onClick={() => props.handleAdd(data?.id)}>
                添加
              </Button>
            </Space>
          </div>
        )
      }
    }
  ]
  return TableColumn
}

export function stockRoomColumns() {
  return [
    {
      title: "ID",
      align: "center",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "出库/入库",
      align: "center",
      dataIndex: "type",
      key: "type",
      render: (type: number) => (type === 1 ? "入库" : "出库")
    },
    {
      title: "数量",
      align: "center",
      dataIndex: "count",
      key: "count"
    },
    {
      title: "原因",
      align: "center",
      dataIndex: "reason",
      key: "reason"
    },
    {
      title: "原数量",
      align: "center",
      dataIndex: "old_num",
      key: "old_num"
    },
    {
      title: "现数量",
      align: "center",
      dataIndex: "new_num",
      key: "new_num"
    },
    {
      title: "时间",
      align: "center",
      dataIndex: "created_at",
      key: "created_at"
    }
  ]
}
