import { FC, useState } from "react"
import { Form, Button, Space, message } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import { RechargeModal, RefundModal, OpenCardModal } from "./Modals"
import { useColumnsIndex } from "./columns"
import type { IDataSource } from "./types"
import useGetData from "@/hooks/useGetData"
import { getMemberlist, recharge } from "../../api/member"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import useBatchCrate from "@/hooks/useBatchCrate"
import "./index.less"
const Index: FC = () => {
  const navigate = useNavigate()
  // const [rechargeFrom] = Form.useForm()
  // const [refundFrom] = Form.useForm()
  // const [formCard] = Form.useForm()
  const [rechargeFrom, refundFrom, formCard] = useBatchCrate(Form.useForm(), 3)
  const [isRechargeModal, setRechargeModal] = useState(false) //充值Modal
  const [isRefundModal, setRefundModal] = useState(false) //退款Modal
  const [isOpenCardModal, setOpenCardModal] = useState(false) //开卡Modal
  const cur_id = useSelector<RootState, number>(state => state.user.cur_id)
  const [oSrch, serSrch, data, , , loading] = useGetData(getMemberlist, {
    org_id: cur_id
  })

  //充值
  async function onRecharge(values: IDataSource) {
    const res = await recharge({
      org_id: cur_id,
      user_id: values?.id,
      type: values?.type,
      name: values?.name,
      amount: values?.money
    })
    if (res?.code === 200) {
      message.success("充值成功")
      setRechargeModal(false)
      rechargeFrom.resetFields()
    }
  }

  //退款
  async function onRefund(values: IDataSource) {
    console.log(values)
  }

  //开卡
  async function onOpenCard(values: IDataSource) {
    console.log(values)
  }

  return (
    <div className="member_list">
      <PageContainer
        title="会员列表"
        extra={
          <Space>
            <Button type="primary" onClick={() => navigate("add")}>
              新增会员
            </Button>
          </Space>
        }
      >
        <SearchForm
          onFinish={vals =>
            serSrch({ ...vals, page: 1, page_size: oSrch.page_size })
          }
          onReset={() => serSrch({ page: 1, page_size: oSrch.page_size })}
        />

        <CustomTable
          dataSource={data?.lists}
          loading={loading}
          scroll={{ x: 1500 }}
          columns={useColumnsIndex({
            openRechargeModal: item => {
              rechargeFrom.setFieldsValue(item)
              setRechargeModal(true)
            },
            openRefundModal: item => {
              refundFrom.setFieldsValue(item)
              setRefundModal(true)
            },
            openCardMaodal: item => {
              formCard.setFieldsValue(item)
              setOpenCardModal(true)
            },
            goEditPage: id => navigate("add?id=" + id),
            goRecordPage: id =>
              navigate("record", { state: { org_id: cur_id, user_id: id } })
          })}
          pagination={{
            total: data?.total,
            current: oSrch.page,
            onChange: (page, page_size) =>
              serSrch({ ...oSrch, page, page_size })
          }}
        />

        <RechargeModal
          open={isRechargeModal}
          form={rechargeFrom}
          onConfirm={onRecharge}
          onCancel={() => setRechargeModal(false)}
        />

        <RefundModal
          open={isRefundModal}
          form={refundFrom}
          onConfirm={onRefund}
          onCancel={() => setRefundModal(false)}
        />

        <OpenCardModal
          open={isOpenCardModal}
          form={formCard}
          onConfirm={onOpenCard}
          onCancel={() => setOpenCardModal(false)}
        />
      </PageContainer>
    </div>
  )
}

export default Index
