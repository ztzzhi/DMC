import { Space, Button, Switch, Image } from "antd"
import type { ColumnsType } from "antd/lib/table"
import moren from "@/assets/images/moren.png"

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

interface Iprops {
  page: number
  pageSize: number
  handleEdit: (...set: any) => any
  handleDel: (...set: any) => any
  handleDetail: (...set: any) => any
  handleSwitch: (...set: any) => any
}

interface IpropsDetail {
  page: number
  pageSize: number
}

export function useColumnsIndex(props: Iprops) {
  const TableColumn: ColumnsType<IDataSource> = [
    {
      title: "ID",
      align: "center",
      dataIndex: "id",
      key: "id",
      width: 150
    },
    {
      title: "封面",
      align: "center",
      dataIndex: "cover_img",
      key: "cover_img",
      width: 150,
      render: src => {
        return <Image style={{ maxHeight: 100 }} src={src} fallback={moren} />
      }
    },
    {
      title: "菜品名称",
      align: "center",
      dataIndex: "name",
      key: "name",
      width: 150
    },
    {
      title: "菜品分类",
      align: "center",
      dataIndex: "category_name",
      key: "category_name",
      width: 150
    },
    {
      title: "菜品单价",
      align: "center",
      dataIndex: "price",
      key: "price",
      width: 150
    },
    {
      title: "库存模板数",
      align: "center",
      dataIndex: "stock",
      key: "stock",
      width: 150
    },
    {
      title: "销量",
      align: "center",
      dataIndex: "sales",
      key: "sales",
      width: 150
    },
    {
      title: "上下架",
      align: "center",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (_, src: any) => {
        return (
          <Switch
            checkedChildren="上架"
            unCheckedChildren="下架"
            defaultChecked={_}
            onChange={() => props.handleSwitch(src.id)}
          />
        )
      }
    },
    {
      title: "创建时间",
      align: "center",
      dataIndex: "created_at",
      key: "created_at",
      width: 150
    },
    {
      title: "修改时间",
      align: "center",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 150
    },
    {
      title: "操作",
      align: "center",
      fixed: "right",
      key: "operation",
      width: 170,
      render: item => {
        return (
          <Space wrap>
            <Button type="link" onClick={() => props.handleEdit(item.id)}>
              编辑
            </Button>
            <Button type="link" onClick={() => props.handleDel(item.id)}>
              删除
            </Button>
            {/* <Button type="link" onClick={props.handleDetail}>
                出入库管理
              </Button> */}
          </Space>
        )
      }
    }
  ]
  return TableColumn
}

export function useColumnsDetail(props: IpropsDetail) {
  const TableColumn: ColumnsType<IDataSource> = [
    {
      title: "ID",
      align: "center",
      dataIndex: "id",
      key: "id",
      width: 150
    },
    {
      title: "出库/入库",
      align: "center",
      dataIndex: "name",
      key: "name",
      width: 150
    },
    {
      title: "数量",
      align: "center",
      dataIndex: "name",
      key: "name",
      width: 150
    },
    {
      title: "原因",
      align: "center",
      dataIndex: "type",
      key: "type",
      width: 150
    },
    {
      title: "原数量",
      align: "center",
      dataIndex: "id_card",
      key: "id_card",
      width: 150
    },
    {
      title: "现数量",
      align: "center",
      dataIndex: "sex",
      key: "sex",
      width: 150
    },
    {
      title: "时间",
      align: "center",
      dataIndex: "age",
      key: "age",
      width: 150
    }
  ]
  return TableColumn
}
