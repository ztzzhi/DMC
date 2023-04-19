import { useState } from "react"
import { Form, message, Button, Space, Modal } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import QueryForm from "@/components/QueryForm"
import { ProFormText } from "@ant-design/pro-components"
import CustomTable from "@/components/CustomTable"
import CustomForm from "@/components/EditForm"
import { useNavigate, useSearchParams } from "react-router-dom"
import useGetData from "@/hooks/useGetData"
import { snList, addDevice, deviceGrant } from "@/api/devicelist"

import { GrantModal } from "./Modals"
import type { TableData } from "./types"
const Index = () => {
  const [query] = useSearchParams()
  const id = query.get("id")
  const [isAddModal, setAddModal] = useState<boolean>(false)
  const [isGrantModal, setGrantModal] = useState<boolean>(false)
  const [batchFlag, setBatchFlag] = useState<boolean>(true)
  const [grantId, setGrantId] = useState<string>()

  const [form] = Form.useForm()
  const [formSearch] = Form.useForm()
  const navigate = useNavigate()
  const [oSrch, setSrch, data, isReq, setReq, loading] = useGetData<TableData>(
    snList,
    { device_id: id }
  )
  async function onAdd(vals: TableData) {
    const res = await addDevice({ ...vals, device_id: id })
    if (res?.code === 200) {
      message.success("操作成功")
      setReq(!isReq)
      setAddModal(false)
    }
  }
  const column = [
    {
      title: "sn编号",
      align: "center",
      dataIndex: "sn",
      key: "sn"
    },
    {
      title: "状态监控",
      align: "center",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "操作",
      align: "center",
      fixed: "right",
      width: 220,
      render: (data: any) => (
        <Space size={1}>
          <Button
            type="link"
            onClick={() => {
              setGrantId(data.id)
              setGrantModal(true)
            }}
          >
            设备发放
          </Button>
        </Space>
      )
    }
  ]
  async function onGrant(vals: TableData) {
    const res = await deviceGrant({ ...vals, device_id: grantId })
    if (res?.code === 200) {
      message.success("操作成功")
      setReq(!isReq)
      setGrantModal(false)
    }
  }
  const onSelectRows = (keys: string[]) => {
    setGrantId(keys.toString())
    if (keys.length > 0) {
      setBatchFlag(false)
    } else {
      setBatchFlag(true)
    }
  }
  return (
    <PageContainer
      title="新增"
      extra={
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setGrantModal(true)
            }}
            disabled={batchFlag}
          >
            批量发放
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form.resetFields()
              setAddModal(true)
            }}
          >
            新增
          </Button>
        </Space>
      }
    >
      <QueryForm
        form={formSearch}
        onFinish={(vals: any) =>
          setSrch({ ...vals, page: 1, page_size: oSrch.page_size })
        }
        onReset={() => setSrch({ page: 1, page_size: oSrch.page_size })}
      >
        <ProFormText name="sn" label="sn" />
      </QueryForm>
      <CustomTable
        isSelection
        selectRows={onSelectRows}
        dataSource={data?.lists}
        loading={loading}
        columns={column}
        pagination={{
          total: data?.total,
          current: oSrch.page,
          onChange: (page, page_size) => setSrch({ ...oSrch, page, page_size })
        }}
      />
      <Modal
        title="添加"
        open={isAddModal}
        forceRender
        onOk={() =>
          form.validateFields().then((vals: TableData) => onAdd(vals))
        }
        onCancel={() => {
          setAddModal(false)
        }}
      >
        <CustomForm
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          form={form}
          formConfigArray={[
            {
              name: "sn",
              label: "SN",
              type: "Input",
              placeholder: "请输入",
              rules: [
                {
                  required: true,
                  message: "请输入"
                }
              ]
            }
          ]}
        />
      </Modal>
      <GrantModal
        open={isGrantModal}
        onConfirm={onGrant}
        onCancel={() => setGrantModal(false)}
      />
    </PageContainer>
  )
}
export default Index
