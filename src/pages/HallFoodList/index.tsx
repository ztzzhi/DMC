import React, { useState } from "react"
import { message, Modal } from "antd"
import { useColumnsIndex } from "./columns"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import { getOrderList, setOrderState } from "../../api/hallfoodlist"
import "./index.less"
import { useNavigate } from "react-router-dom"
import useGetData from "@/hooks/useGetData"
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import { getOrderDetail } from "@/api/hallfoodlist"
import DishesTable from "./DishesTable"

const Index: React.FC = () => {
  const [opencardVisible, setOpencardVisible] = useState(false) //退款Modal
  const navigate = useNavigate()
  const orgID = useSelector<RootState, number>(state => state.user.cur_id)
  const [detail, setDetail] = useState<any>({})
  const [refundID, setRefundID] = useState<any>()
  const [oSrch, setSrch, data, isSendReq, setSendReq, loading] = useGetData(
    getOrderList,
    {
      org_id: orgID
    }
  )

  async function orderOperate(id: string, type: string) {
    const res = await setOrderState({ org_id: orgID, id, operate: type })
    if (res?.code === 200) {
      setSendReq(!isSendReq)
      message.success("操作成功")
      setOpencardVisible(false)
    }
  }

  async function handleRefund(id: string) {
    setRefundID(id)
    const res = await getOrderDetail({ id, org_id: orgID })
    setDetail(res?.data)
    setOpencardVisible(true)
  }

  return (
    <div className="hallfood_list">
      <PageContainer title="堂食订单列表">
        <SearchForm
          onFinish={(vals: any) =>
            setSrch({ page: 1, page_size: oSrch.page_size, ...vals })
          }
          onReset={() => setSrch({ page: 1, page_size: oSrch.page_size })}
        />
        <CustomTable
          dataSource={data?.lists}
          loading={loading}
          scroll={{ x: 1500 }}
          columns={useColumnsIndex({
            orderOperate,
            handleRefund,
            handleDetail: id => navigate("/order/hallfoodlist/detail?id=" + id)
          })}
          pagination={{
            total: data?.total,
            current: oSrch.page,
            onChange: (page, page_size) =>
              setSrch({ ...oSrch, page, page_size })
          }}
        />
        <Modal
          title="退款"
          width={700}
          open={opencardVisible}
          maskClosable={false}
          centered
          onOk={() => orderOperate(refundID, "refund")}
          onCancel={() => setOpencardVisible(false)}
        >
          <DishesTable detail={detail} />
        </Modal>
      </PageContainer>
    </div>
  )
}

export default Index
