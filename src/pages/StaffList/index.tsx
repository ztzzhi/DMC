import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { Button, message, Space } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import columns from "./columns"
import useGetData from "@/hooks/useGetData"
import { getList, openAccount, deleStaff } from "@/api/staffist"
import { TableData } from "./types"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
const Index: FC = () => {
  const navigate = useNavigate()
  const orgID = useSelector<RootState, any>(state => state.user.cur_id)
  const [oSrch, setSrch, tableData, isSendReq, setSendReq, loading] =
    useGetData<TableData>(getList, { org_id: orgID })

  async function openedAccount(id: any) {
    const res: Resolve = await openAccount({ org_id: orgID, id })
    if (res?.code === 200) {
      setSendReq(!isSendReq)
      message.success("操作成功")
    }
  }

  async function onDelete(id: string | number) {
    const res: Resolve = await deleStaff({ id })
    if (res?.code === 200) {
      setSendReq(!isSendReq)
      message.success("删除成功")
    }
  }

  const data: any = tableData?.lists?.map((item: TableData) => ({
    ...item,
    key: item.id,
    sex: item.sex === 1 ? "男" : "女"
  }))

  return (
    <>
      <PageContainer
        title="员工列表"
        extra={
          <Space>
            <Button type="primary" onClick={() => navigate("add")}>
              新增员工
            </Button>
          </Space>
        }
      />
      <SearchForm
        onFinish={vals =>
          setSrch({ ...vals, page: 1, page_size: oSrch.page_size })
        }
        onReset={() => setSrch({ page: 1, page_size: oSrch.page_size })}
      />
      <CustomTable
        dataSource={data}
        loading={loading}
        scroll={{ x: 1500 }}
        columns={columns({
          openedAccount,
          goEditPage: id => navigate("add?id=" + id),
          onDelete
        })}
        pagination={{
          total: tableData?.total,
          current: oSrch.page,
          onChange: (page, page_size) => setSrch({ ...oSrch, page, page_size })
        }}
      />
    </>
  )
}

export default Index
