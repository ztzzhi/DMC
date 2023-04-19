import { FC, useEffect, useState } from "react"
import {
  Button,
  Form,
  message,
  Modal,
  Tree,
  Space,
  notification,
  Select
} from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import { useColumnsIndex } from "./columns"
import useGetData from "@/hooks/useGetData"
import { useNavigate } from "react-router-dom"
import { listApp, appidGetRoute, AppToFunc } from "../../api/index"

import "./index.less"

const Index: FC = () => {
  const navigate = useNavigate()
  const [appSelect, setAppSelect] = useState([])
  const [isModalOpen, setModelOpen] = useState(false)
  const [ModalTitle, setModelTitle] = useState("绑定其他服务功能")
  const [TreeMapr, setTreeMap] = useState([])
  const [checkis, setCheckIs] = useState([])
  const [form] = Form.useForm()
  const [client_id, setClientId] = useState("")
  const [oSrch, serSrch, data, , , loading] = useGetData(listApp, {
    desc: true,
    limit: 10,
    order_key: "id"
  })

  useEffect(() => {
    getAppSelect()
  }, [])

  const getAppSelect = (params = { page: 1, limit: 100 }) => {
    listApp(params).then(r => {
      if (r.code === 200) {
        setAppSelect(r.data.lists)
      }
    })
  }

  const onTreeCheck = (checkedKeys: any, e: any) => {
    setCheckIs(checkedKeys.checked)
  }

  const handleDelete = () => {
    console.log(123)
  }

  const handleEdit = () => {
    console.log(132)
  }

  const handleShowKey = (props: any) => {
    notification.open({
      message: `${props.id}-秘钥`,
      description: `${props.client_secret}`,
      duration: 0,
      placement: "top"
    })
  }

  const handleSelect = (e: any) => {
    appidGetRoute(e).then((r: any) => {
      if (r.code === 200) {
        setTreeMap(r.data)
      }
    })
  }

  const handleShowModel = (props: any) => {
    setModelTitle(props.client_id + "-绑定其他服务功能")
    setClientId(props.client_id)
    setModelOpen(true)
  }

  const handleOk = (props: any) => {
    const a = {
      client_id: client_id
    } as any
    a.func_id = checkis
    AppToFunc(a).then((r: any) => {
      if (r.code == 200) {
        message.success(`绑定成功`, 2)
      }
    })
  }

  const handleCancel = (props: any) => {
    setModelOpen(false)
  }

  return (
    <div className="Appmanage">
      <PageContainer
        title="应用管理"
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => navigate("/scaffold/app/edit")}
            >
              新增
            </Button>
          </Space>
        }
      >
        <SearchForm
          onFinish={(vals: any) =>
            serSrch({ ...vals, page: 1, page_size: oSrch.page_size })
          }
          onReset={() => serSrch({ page: 1, page_size: oSrch.page_size })}
          appSelect={appSelect}
        />

        <CustomTable
          dataSource={data?.lists}
          loading={loading}
          scroll={{ x: 1500 }}
          columns={useColumnsIndex({
            handleEdit,
            handleDelete,
            handleShowKey,
            handleShowModel
          })}
          pagination={{
            total: data?.total,
            current: oSrch.page,
            onChange: (page, page_size) =>
              serSrch({ ...oSrch, page, page_size })
          }}
        />
      </PageContainer>
      <Modal
        width="40%"
        title={ModalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          // layout="vertical"
        >
          {/* 模块生成属性收集 */}
          <Form.Item extra="选择所属应用" label="所属应用" name="client_id">
            <Select onChange={value => handleSelect(value)}>
              {appSelect.map((value: any, index) => {
                return (
                  <Select.Option key={index + 1} value={value.client_id}>
                    {value.client_desc}-{value.client_id}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Tree
            checkable
            defaultExpandAll={true}
            fieldNames={{ title: "title", key: "id", children: "children" }}
            onCheck={onTreeCheck}
            checkStrictly={true}
            showLine={true}
            treeData={TreeMapr}
          />
        </Form>
      </Modal>
    </div>
  )
}

export default Index
