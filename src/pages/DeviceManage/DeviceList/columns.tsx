import { Space, Popconfirm, Button } from "antd"
import type { ColumnsType } from "antd/es/table"
import type { TableData } from "./types"
type fun = (id?: any) => void
interface Props {
  openSeeModal: fun
  openGrantModal: fun
  openAddModal: fun
  goEditPage: fun
  onDele: fun
}
export const userColumns = ({
  openSeeModal,
  openGrantModal,
  openAddModal,
  goEditPage,
  onDele
}: Props): ColumnsType<TableData> => [
  {
    title: "名称",
    align: "center",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "型号",
    align: "center",
    dataIndex: "model",
    key: "model"
  },
  {
    title: "厂商",
    align: "center",
    dataIndex: "manufacturer",
    key: "manufacturer"
  },
  {
    title: "数量",
    align: "center",
    dataIndex: "total_num",
    key: "total_num"
  },
  {
    title: "类型",
    align: "center",
    dataIndex: "type",
    key: "type",
    render: type => (type === 1 ? "用户设备" : "空间设备")
  },
  {
    title: "激活方式",
    align: "center",
    dataIndex: "active_type",
    key: "active_type",
    render: txt => (
      <Button type="link" onClick={() => openSeeModal(txt)}>
        查看
      </Button>
    )
  },
  {
    title: "对接方式",
    align: "center",
    dataIndex: "docking_mode",
    key: "docking_mode",
    render: txt => (
      <Button type="link" onClick={() => openSeeModal(txt)}>
        查看
      </Button>
    )
  },
  {
    title: "操作",
    align: "center",
    fixed: "right",
    width: 300,
    render: (data: any) => (
      <Space size={1}>
        <Button type="link" onClick={() => openAddModal(data?.id)}>
          添加
        </Button>
        <Button type="link" onClick={() => openGrantModal(data?.id)}>
          设备发放
        </Button>
        <Button type="link" onClick={() => goEditPage(data)}>
          编辑
        </Button>
        <Popconfirm
          title={`确定删除吗？`}
          onConfirm={() => onDele(data?.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" style={{ color: "red" }}>
            删除
          </Button>
        </Popconfirm>
      </Space>
    )
  }
]
export const spaceColumns = ({ onDele }: Props): ColumnsType<any> => [
  {
    title: "地址",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "位置",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "设备类型",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "设备名称",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "设备型号",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "设备编号",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "相关老人",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "报警内容",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "报警时间",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "报警结束",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "处理状态",
    align: "center",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "操作",
    align: "center",
    fixed: "right",
    width: 100,
    render: (data: any) => (
      <Space size={1}>
        <Popconfirm
          title={`确定删除吗？`}
          onConfirm={() => onDele(data?.key)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link" style={{ color: "red" }}>
            删除
          </Button>
        </Popconfirm>
      </Space>
    )
  }
]
