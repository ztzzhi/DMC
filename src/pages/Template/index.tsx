import React, { useState, useEffect } from "react"
import { Form, Button, Space, Modal } from "antd"

import useColumns from "./columns"
import QueryForm from "@/components/QueryForm"
import PageContainer from "@/components/PageContainer/PageContainer"
import Table from "@/components/Table"
import {
  ProFormDatePicker,
  ProFormText,
  ProFormSelect,
  ProFormDateTimeRangePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker
} from "@ant-design/pro-components"

import { getMemberlist } from "../../api/member"

// import TableOrder from "@/components/TableOrder/TableOrder"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import useFormEdit from "./useFormEdit"

import EditForm from "@/components/EditForm"

const { confirm } = Modal

const Index: React.FC = () => {
  // QueryFilter使用
  const [formSearch] = Form.useForm()
  // table组件使用
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [condition, setCondition] = useState<{
    name?: string
    page: number
    pageSize: number
    status?: string
  }>({
    page: 1,
    pageSize: 10
  })

  // 编辑Modal
  const [visible, setVisible] = useState(false)
  const [formEdit] = Form.useForm()

  useEffect(() => {
    getList()
  }, [])

  const getList = async (param = {}) => {
    const result: any = await getMemberlist(param)
    const { data, code } = result
    if (code === 0) {
      setList(data.data)
      setLoading(false)
      setTotal(data?.total)
    }
  }

  const onFinish = (val: any) => {
    console.log(val)
  }

  // 设置每页分页的条数
  const getPageSize = (page: number, size: number) => {
    setCondition({ ...condition, page, pageSize: size })
    getList({ ...condition, page, pageSize: size })
  }

  const handleEdit = () => {
    setVisible(true)
  }

  const handleDel = () => {
    confirm({
      title: "培训机构审核确认不通过?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        console.log("del")
      },
      onCancel() {
        console.log("Cancel")
      }
    })
  }

  return (
    <>
      <PageContainer
        title="后台列表模板"
        extra={
          <Space>
            <Button type="primary">新建</Button>
            <Button>打印</Button>
          </Space>
        }
      >
        <QueryForm onFinish={onFinish} form={formSearch}>
          <ProFormText name="name" label="应用名称" />
          <ProFormDatePicker name="createDate" label="创建时间" />
          <ProFormText name="status" label="应用状态" />
          <ProFormDatePicker name="replyDate" label="响应日期" />
          <ProFormDateTimePicker name="startDate" label="创建时间" />
          <ProFormSelect
            name="select"
            label="选择器"
            mode="single"
            options={[
              { label: "123", value: "1" },
              { label: "1234", value: "2" }
            ]}
          />
          <ProFormDateRangePicker name="endDate" label="结束时间" />
          <ProFormDateTimeRangePicker
            name="ProFormDateTimeRangePicker"
            label="结束时间"
          />
        </QueryForm>

        <Table
          dataSource={list}
          columns={useColumns({
            page: condition.page,
            pageSize: condition.pageSize,
            handleEdit,
            handleDel
          })}
          onChange={getPageSize}
          loading={loading}
          total={total}
          page={condition.page}
        ></Table>

        <Modal
          title="编辑功能展示"
          width={600}
          open={visible}
          maskClosable={false}
          onOk={() => {
            formEdit
              .validateFields()
              .then(values => {
                console.log(values) // values 是 formEdit表单数据
              })
              .catch(err => {
                console.log(err)
              })
          }}
          onCancel={() => {
            formEdit.resetFields()
            setVisible(false)
          }}
        >
          <EditForm formConfigArray={useFormEdit()} form={formEdit}></EditForm>
        </Modal>
      </PageContainer>
    </>
  )
}

export default Index
