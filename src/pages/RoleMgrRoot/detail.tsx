import React, { useState, useEffect } from "react"
import { Form, Modal, Space, Button } from "antd"
import { useColumnsDetail } from "./columns"
import QueryForm from "@/components/QueryForm"
import PageContainer from "@/components/PageContainer/PageContainer"
import Table from "@/components/Table"
import {
  ProFormField,
  ProFormSelect,
  ProFormDatePicker
} from "@ant-design/pro-components"
import { getMemberlist } from "../../api/member"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useFormIn, useFormOut } from "./useFormEdit"
import EditForm from "@/components/EditForm"
const { confirm } = Modal
import "./index.less"
import { useNavigate } from "react-router-dom"

const Index: React.FC = () => {
  const [formSearch] = Form.useForm()
  const [inForm] = Form.useForm() // 入库
  const [outForm] = Form.useForm() // 出库
  const [inVisible, setInVisible] = useState(false) //入库Modal
  const [outVisible, setOutVisible] = useState(false) //出库Modal
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const [condition, setCondition] = useState<{
    name?: string
    page: number
    pageSize: number
    status?: string
  }>({
    page: 1,
    pageSize: 10
  })

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
    navigate("/devicemgrroot/add?id=1")
  }
  const handleDel = () => {
    confirm({
      title: "确定删除此菜品吗?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        console.log("cancel")
      },
      onCancel() {
        console.log("Cancel")
      }
    })
  }
  const handleDetail = () => {
    navigate("/devicemgrroot/detail?id=1")
  }

  const handleIn = () => {
    setInVisible(true)
  }

  const handleOut = () => {
    setOutVisible(true)
  }

  return (
    <div className="rolemgrroot_detail">
      <PageContainer
        title="出入库管理"
        extra={
          <Space>
            <Button type="primary" onClick={handleIn}>
              入库
            </Button>
            <Button type="primary" onClick={handleOut}>
              出库
            </Button>
          </Space>
        }
      >
        <QueryForm onFinish={onFinish} form={formSearch}>
          <ProFormDatePicker name="time" label="时间选择" />
        </QueryForm>

        <Table
          dataSource={list}
          columns={useColumnsDetail({
            page: condition.page,
            pageSize: condition.pageSize
          })}
          onChange={getPageSize}
          loading={loading}
          total={total}
          page={condition.page}
        ></Table>

        <Modal
          title="入库"
          width={600}
          open={inVisible}
          maskClosable={false}
          centered
          onOk={() => {
            inForm
              .validateFields()
              .then(values => {
                console.log(values)
              })
              .catch(err => {
                console.log(err)
              })
          }}
          onCancel={() => {
            inForm.resetFields()
            setInVisible(false)
          }}
        >
          <EditForm
            formConfigArray={useFormIn()}
            layout="vertical"
            form={inForm}
          ></EditForm>
        </Modal>

        <Modal
          title="出库"
          width={600}
          open={outVisible}
          maskClosable={false}
          centered
          onOk={() => {
            outForm
              .validateFields()
              .then(values => {
                console.log(values)
              })
              .catch(err => {
                console.log(err)
              })
          }}
          onCancel={() => {
            outForm.resetFields()
            setOutVisible(false)
          }}
        >
          <EditForm
            formConfigArray={useFormOut()}
            layout="vertical"
            form={outForm}
          ></EditForm>
        </Modal>
      </PageContainer>
    </div>
  )
}

export default Index
