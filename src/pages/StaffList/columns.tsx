import { Space, Popconfirm, Image } from "antd"
import type { ColumnsType } from "antd/es/table"
import { TableData } from "./types"
import moren from "@/assets/images/moren.png"
type fun = (id: string | number) => void
interface Props {
  openedAccount: fun
  goEditPage: fun
  onDelete: fun
}
const columns = ({
  openedAccount,
  goEditPage,
  onDelete
}: Props): ColumnsType<TableData> => [
  {
    title: "ID",
    align: "center",
    dataIndex: "id"
  },
  {
    title: "员工照片",
    align: "center",
    render: (data: TableData) => (
      <Image
        src={data?.user_photo}
        fallback={moren}
        style={{ maxHeight: 100 }}
      />
    )
  },
  {
    title: "姓名",
    align: "center",
    dataIndex: "name"
  },
  {
    title: "角色",
    align: "center",
    dataIndex: "roule_name"
  },
  {
    title: "身份证号",
    align: "center",
    dataIndex: "id_card",
    width: 150
  },
  {
    title: "性别",
    align: "center",
    dataIndex: "sex"
  },
  {
    title: "年龄",
    align: "center",
    dataIndex: "age"
  },
  {
    title: "手机号",
    align: "center",
    dataIndex: "phone"
  },
  {
    title: "健康证",
    align: "center",
    render: (data: TableData) => (
      <Image
        src={data?.user_health_photo}
        fallback={moren}
        style={{ maxHeight: 100 }}
      />
    )
  },
  {
    title: "操作",
    align: "center",
    fixed: "right",
    width: 200,
    render: (data: TableData) => (
      <Space size="middle">
        <Popconfirm
          title={
            data?.user_state === 0
              ? "确认开通吗？"
              : "确定关闭账号吗？请确认该账号是否正在使用"
          }
          onConfirm={() => openedAccount(data?.id)}
          okText="确定"
          cancelText="取消"
        >
          <a style={{ color: data?.user_state === 1 ? "red" : "" }}>
            {data?.user_state === 0 ? "开通" : "关闭"}账号
          </a>
        </Popconfirm>

        <a type="primary" onClick={() => goEditPage(data?.id)}>
          编辑
        </a>
        <Popconfirm
          title="确定删除吗？"
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
