import { FC, useState } from "react"
import { Button, message, Space } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import StockroomSearchForm from "./StockroomSearchForm"
import CustomTable from "@/components/CustomTable"
import { stockRoomColumns } from "./columns"
import { StorageModal, OutboundModal } from "./Modal"
import { useLocation, useNavigate } from "react-router-dom"
import { storeroomOperate, storeroomList } from "@/api/weeklyMenu"
import useGetData from "@/hooks/useGetData"
import dayjs from "dayjs"
const Index: FC = () => {
  const locationState = useLocation().state
  const navigate = useNavigate()
  const [isStorageModal, setStorageModal] = useState<boolean>(false)
  const [isOutboundModal, setOutboundModal] = useState<boolean>(false)
  const [oSrch, setSrch, data, isSendReq, setSendReq, loading] = useGetData(
    storeroomList,
    { org_id: locationState?.org_id, id: locationState?.product_id }
  )
  async function onStoreroomOperate(vals: { count: number }, type: number) {
    const res: Resolve = await storeroomOperate({
      ...vals,
      ...locationState,
      type
    })
    if (res?.code === 200) {
      setSendReq(!isSendReq)
      if (type === 1) {
        setStorageModal(false)
        message.success("入库成功")
      } else {
        setOutboundModal(false)
        message.success("出库成功")
      }
    }
  }

  return (
    <PageContainer
      title="出入库管理"
      extra={
        <Space>
          <Button type="primary" onClick={() => setStorageModal(true)}>
            入库
          </Button>
          <Button type="primary" onClick={() => setOutboundModal(true)}>
            出库
          </Button>
        </Space>
      }
      footer={
        <>
          <Space>
            <Button onClick={() => navigate(-1)}>返回</Button>
          </Space>
        </>
      }
    >
      <StockroomSearchForm
        onFinish={vals => {
          const date = dayjs(vals?.date).format("YYYY-MM-DD")
          setSrch({ date, page: 1, page_size: oSrch.page_size })
        }}
        onReset={() => setSrch({ page: 1, page_size: oSrch.page_size })}
      />
      <CustomTable
        dataSource={data?.lists}
        loading={loading}
        columns={stockRoomColumns()}
        pagination={{
          total: data?.total,
          current: oSrch.page,
          onChange: (page, page_size) => setSrch({ ...oSrch, page, page_size })
        }}
      />
      <div style={{ height: "5vh" }} />
      <StorageModal
        open={isStorageModal}
        onConfirm={vals => onStoreroomOperate(vals, 1)}
        onCancel={() => setStorageModal(false)}
      />
      <OutboundModal
        open={isOutboundModal}
        onConfirm={vals => onStoreroomOperate(vals, 2)}
        onCancel={() => setOutboundModal(false)}
      />
    </PageContainer>
  )
}

export default Index
