import { FC } from "react"
import { Space, Button, message } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import columns from "./columns"
import { getList, setIsOpen } from "@/api/canteenmgrroot"
import { useNavigate } from "react-router-dom"
import useGetData from "@/hooks/useGetData"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import type { TableData } from "./types"
import dayjs from "dayjs"
const Index: FC = () => {
  const navigate = useNavigate()
  const cur_id = useSelector<RootState, number>(state => state.user.cur_id)
  const [oSrch, setSrch, tableData, isSendReq, setSendReq, loading] =
    useGetData<TableData>(getList, {
      org_id: cur_id
    })
  async function onDelete(id: string) {
    console.log(id)
  }
  const data: TableData[] = tableData?.lists?.map((item: TableData) => {
    const { id, created_at, ...vals } = item
    return {
      ...vals,
      key: id,
      created_at: dayjs(created_at).format("YYYY-MM-DD HH:mm:ss")
    }
  })

  return (
    <div className="canteenmgr_list">
      <PageContainer
        title="设备管理"
        extra={
          <Space>
            <Button type="primary" onClick={() => navigate("add")}>
              添加食堂
            </Button>
          </Space>
        }
      >
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
            goEditPage: id => navigate("add?id=" + id),
            onDelete
          })}
          pagination={{
            total: tableData?.total,
            current: oSrch.page,
            onChange: (page, page_size) =>
              setSrch({ ...oSrch, page, page_size })
          }}
        />
      </PageContainer>
    </div>
  )
}

export default Index
