import { Space, Popconfirm } from "antd"

const columns = ({ openEditModal, onDelete }: any) => [
  {
    title: "分类名称",
    align: "center",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "添加时间",
    align: "center",
    dataIndex: "created_at",
    key: "created_at"
  },
  {
    title: "编辑时间",
    align: "center",
    dataIndex: "updated_at",
    key: "updated_at"
  },

  {
    title: "操作",
    align: "center",
    fixed: "right",
    key: "操作",
    width: 200,
    render: (data: any) => (
      <Space size="middle" style={{ display: data?.id === 0 ? "none" : "" }}>
        <a onClick={() => openEditModal(data?.id, data?.name)}>编辑</a>
        <Popconfirm
          title="确定删除？删除后对应菜品将归到默认分类"
          onConfirm={() => onDelete(data?.id)}
          okText="确定"
          cancelText="取消"
        >
          <a>删除</a>
        </Popconfirm>
      </Space>
    )
  }
]
export default columns
