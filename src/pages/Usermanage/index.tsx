import { FC, useState } from "react"
import { Form, Button, Space, message, Modal, Select, Checkbox } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import { useColumnsIndex } from "./columns"
import useGetData from "@/hooks/useGetData"
import { listApp } from "@/api"
import {
  getUsermanage,
  appidGetRoule,
  UserToRoule,
  bindOrgan,
  addList
} from "../../api/usermanage"
import { useNavigate } from "react-router-dom"
import useBatchCrate from "@/hooks/useBatchCrate"
import "./index.less"
import { AddModal, BindOrganModal } from "./Modals"
const CheckboxGroup = Checkbox.Group
const { Option } = Select
const Index: FC = () => {
  const navigate = useNavigate()
  const [isAddModal, setAddModal] = useState<boolean>(false)
  const [isBindOrganModal, setBindOrganModal] = useState<boolean>(false)
  const [bindOrginUserId, setBindOrginUserId] = useState<string>()
  const [isModalOpen, setModelOpen] = useState(false)
  const [ModalTitle, setModelTitle] = useState("用户绑定角色")
  const [CheckboxMap, setCheckboxMap] = useState([])
  const [appSelect, setAppSelect] = useState([])
  const [UserId, setUserId] = useState("")
  const [rechargeFrom, refundFrom, formCard, form] = useBatchCrate(
    Form.useForm(),
    4
  )
  const [oSrch, serSrch, data, isReq, setReq, loading] = useGetData(
    getUsermanage,
    {
      desc: true,
      limit: 10,
      order_key: "id"
    }
  )

  const handleShowModel = async (props: any) => {
    console.log(props, "props")

    await getAppSelect()
    setModelTitle("用户-" + props.name + "-绑定角色")
    setUserId(props.id)
    setModelOpen(true)
  }

  const onConfirm = (values: any) => {
    values.user_id = UserId
    UserToRoule(values).then((r: any) => {
      if (r.code == 200) {
        message.success(`绑定成功`, 2)
        handleCancel()
      }
    })
  }

  const handleCancel = () => {
    form.resetFields()
    setCheckboxMap([])
    setModelOpen(false)
  }

  const getAppSelect = (params: any = {}) => {
    params.page = 1
    params.limit = 100
    listApp(params).then(r => {
      if (r.code === 200) {
        setAppSelect(
          r?.data?.lists?.map((item: any) => {
            return {
              ...item,
              value: item.client_id,
              label: item.client_desc + "-" + item.client_id
            }
          })
        )
      }
    })
  }

  const handleSelect = async (e: any) => {
    await appidGetRoule({ client_id: e, user_id: UserId }).then(r => {
      setCheckboxMap(r.data)
    })
  }

  async function onAdd(vals: any) {
    const res: Resolve = await addList(vals)
    if (res?.code === 200) {
      message.success("操作成功")
      setReq(!isReq)
      setAddModal(false)
    }
  }

  async function onBindOrange(values: any) {
    const res = await bindOrgan({ ...values, user_id: bindOrginUserId })
    if (res?.code === 200) {
      message.success("操作成功")
      setBindOrganModal(false)
    }
  }

  return (
    <div className="member_list">
      <PageContainer
        title="用户管理"
        extra={
          <Space>
            <Button type="primary" onClick={() => setAddModal(true)}>
              新增
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
            handleShowModel,
            openBindOranModel: id => {
              setBindOrginUserId(id)
              setBindOrganModal(true)
            }
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
        title="绑定角色"
        width={600}
        open={isModalOpen}
        getContainer={false}
        onOk={() => {
          form
            .validateFields()
            .then((values: any) => onConfirm(values))
            .catch((err: any) => {
              console.log(err)
            })
        }}
        onCancel={handleCancel}
      >
        <Form form={form}>
          {/* 模块生成属性收集 */}
          <Form.Item extra="选择所属应用" label="所属应用" name="client_id">
            <Select onChange={value => handleSelect(value)}>
              {appSelect.map((value: any, index) => {
                return (
                  <Option key={index + 1} value={value.client_id}>
                    {value.client_desc}-{value.client_id}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            extra="根据不同应用绑定角色"
            label="绑定角色"
            name="roule_id"
          >
            <CheckboxGroup>
              {CheckboxMap.length > 0 ? (
                CheckboxMap.map((v: any, k) => {
                  return v.count ? (
                    <Checkbox
                      checked={true}
                      defaultChecked={true}
                      key={k}
                      value={v.role_key}
                    >
                      {v.role_key}-{v.role_name}
                    </Checkbox>
                  ) : (
                    <Checkbox key={k} value={v.role_key}>
                      {v.role_key}-{v.role_name}
                    </Checkbox>
                  )
                })
              ) : (
                <Checkbox disabled>请先选择应用</Checkbox>
              )}
            </CheckboxGroup>
          </Form.Item>
        </Form>
      </Modal>
      <AddModal
        open={isAddModal}
        onConfirm={val => onAdd(val)}
        onCancel={() => setAddModal(false)}
      />

      <BindOrganModal
        open={isBindOrganModal}
        onConfirm={onBindOrange}
        onCancel={() => setBindOrganModal(false)}
      />
    </div>
  )
}

export default Index
