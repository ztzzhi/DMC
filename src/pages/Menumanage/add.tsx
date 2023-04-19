import React, { useState, useEffect } from "react"
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Steps,
  Card,
  Radio,
  Switch,
  Select,
  Space,
  message
} from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useNavigate, useSearchParams } from "react-router-dom"
import { listApp } from "@/api/index"
import { addFunc, selectMenu } from "@/api/index"

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [appSelect, setAppSelect] = useState([])
  const [menuSelectData, setMenuSelect] = useState([])
  const [sendLoading, setSendLoading] = useState(false)
  const [query] = useSearchParams()
  const id = query.get("id")

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

  const getMenuSelect = (params: any) => {
    selectMenu(params).then((r: any) => {
      if (r.code === 200) {
        setMenuSelect(r.data)
      }
    })
  }

  const onSubmit = () => {
    const value = form.getFieldsValue()
    id && (value.id = id)
    addFunc(value).then((r: any) => {
      if (r.code === 200) {
        message.success(`添加成功`, 2)
        navigate(-1)
      }
    })
  }

  const onReset = () => {
    form.resetFields()
  }

  const onRadioChange = () => {
    console.log(123)
  }

  const onSelectChange = (p: any) => {
    getMenuSelect({ client_id: p })
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <>
      <PageContainer
        title="新增功能"
        footer={
          <>
            <Space>
              <Button onClick={handleBack}>返回</Button>
              <Button type="primary" onClick={onSubmit} loading={sendLoading}>
                提交
              </Button>
            </Space>
          </>
        }
      >
        <Form form={form}>
          <div className="steps-content">
            <Row className="one_row">
              <Col span={7}></Col>
              <Col span={10}>
                {/* 模块生成属性收集 */}
                <Form.Item
                  extra="设置功能所属应用"
                  label="所属应用"
                  name="client_id"
                >
                  <Select onChange={onSelectChange}>
                    {appSelect.map((value: any, index) => {
                      return (
                        <Select.Option key={index + 1} value={value.client_id}>
                          {value.client_desc}-{value.client_id}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>

                <Form.Item label="所属栏目" name="pid">
                  <Select>
                    <Select.Option value={"0"}>---顶级栏目---</Select.Option>
                    {menuSelectData.map((value: any, index) => {
                      return (
                        <Select.Option key={index + 1} value={value.id}>
                          {value.client_id}-{value.name}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>

                <Form.Item label="功能名称" name="title">
                  <Input />
                </Form.Item>

                <Form.Item
                  extra="选择功能状态，对应：栏目 路由 接口"
                  label="所属权限"
                  name="is_power"
                >
                  <Radio.Group onChange={onRadioChange}>
                    <Radio value={1}>公共</Radio>
                    <Radio value={2}>应用</Radio>
                    <Radio value={3}>用户</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  extra="设置功能路由地址"
                  label="路由地址"
                  name="path"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  extra="选择功能状态，对应：栏目 路由 接口"
                  label="功能状态"
                  name="route_type"
                >
                  <Radio.Group onChange={onRadioChange}>
                    <Radio value={1}>路由</Radio>
                    <Radio value={2}>接口</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="页面地址" name="source_path">
                  <Input />
                </Form.Item>

                <Form.Item label="栏目图标" name="menu_icon">
                  <Input />
                </Form.Item>

                <Form.Item extra="设置功能唯一标识" label="功能标识" name="key">
                  <Input />
                </Form.Item>

                <Form.Item label="是否栏目" name="is_menu">
                  <Radio.Group onChange={onRadioChange}>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="请求方式" name="request_type">
                  <Select>
                    <Select.Option value="ANY">ANY</Select.Option>
                    <Select.Option value="POST">POST</Select.Option>
                    <Select.Option value="GET">GET</Select.Option>
                    <Select.Option value="PUT">PUT</Select.Option>
                    <Select.Option value="DELETE">DELETE</Select.Option>
                  </Select>
                  <div style={{ height: "50px" }}></div>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </PageContainer>
    </>
  )
}

export default Index
