import React, { useState, useEffect } from "react"
import { Form, Button, Space } from "antd"
import { useColumnsRecord } from "./columns"
import QueryForm from "@/components/QueryForm"
import PageContainer from "@/components/PageContainer/PageContainer"
import Table from "@/components/Table"
import { ProFormDatePicker, ProFormSelect } from "@ant-design/pro-components"
import { getTransactions } from "../../api/member"
import "./index.less"
import { useLocation, useNavigate } from "react-router-dom"
import useGetData from "@/hooks/useGetData"
import dayjs from "dayjs"
const Index: React.FC = () => {
  const [formSearch] = Form.useForm()
  const locationState = useLocation().state
  const navigate = useNavigate()
  const [oSrch, setSrch, data, , , loading] = useGetData(
    getTransactions,
    locationState
  )

  const onFinish = (values: any) => {
    const { created_at, ...vals } = values
    setSrch({
      ...vals,
      created_at: dayjs(created_at).format("YYYY-MM-DD"),
      page: 1,
      page_size: oSrch.page_size
    })
  }

  // 设置每页分页的条数
  const getPageSize = (page: number, size: number) => {
    setSrch({ ...oSrch, page, page_size: size })
  }

  return (
    <div className="member_record">
      <PageContainer
        title="交易记录"
        footer={
          <>
            <Space>
              <Button onClick={() => navigate(-1)}>返回</Button>
            </Space>
          </>
        }
      >
        <QueryForm
          onFinish={onFinish}
          onReset={() => setSrch({ page: 1, page_size: oSrch.page_size })}
          form={formSearch}
        >
          <ProFormSelect
            name="up_type"
            label="类型"
            mode="single"
            options={[
              { label: "消费", value: 1 },
              { label: "充值", value: 2 },
              { label: "退款", value: 3 }
            ]}
          />
          <ProFormDatePicker name="created_at" label="创建时间" />
        </QueryForm>

        <Table
          dataSource={data?.lists}
          columns={useColumnsRecord()}
          onChange={getPageSize}
          loading={loading}
          total={data?.total as number}
          page={oSrch.page}
        />
        <div style={{ height: "5vh" }} />
      </PageContainer>
    </div>
  )
}

export default Index
