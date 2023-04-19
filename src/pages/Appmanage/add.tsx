import React, { useState, useEffect } from "react"
import { Form, Input, Button, Row, Col, Space } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useNavigate, useSearchParams } from "react-router-dom"
import { addApp } from "@/api/index"
const { TextArea } = Input

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [sendLoading, setSendLoading] = useState(false)
  const [query] = useSearchParams()
  const id = query.get("id")

  const onSubmit = () => {
    const value = form.getFieldsValue()
    addApp(value).then((res: any) => {
      console.log(123)
    })
  }

  const onReset = () => {
    form.resetFields()
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <>
      <PageContainer
        title="新增应用"
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
        <Form form={form} layout="vertical">
          <div className="steps-content">
            <Row className="one_row">
              <Col span={7}></Col>
              <Col span={10}>
                {/* 模块生成属性收集 */}
                <Form.Item
                  extra="应用唯一标识。例如：用户服务 user-service"
                  label="应用标识"
                  name="name"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  // extra="应用名称"
                  label="应用名称"
                  name="desc"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  extra="应用路由前缀 例如：用户 user"
                  label="服务前缀"
                  name="prefix"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  extra="应用绑定域名 例如： xxx.xxx.com"
                  label="绑定地址"
                  name="hosts"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  extra="应用绑定节点 例如： 127.0.0.1:xxxx"
                  label="绑定节点"
                  name="node_host"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  extra="输入使用客户端的地址"
                  label="客户端地址"
                  name="do_main"
                >
                  <TextArea />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 8
                  }}
                >
                  <Space>
                    <Button type="primary" onClick={onSubmit}>
                      提交
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      重置
                    </Button>
                  </Space>
                </Form.Item>
              </Col>

              <Col span={7}></Col>
            </Row>
          </div>
        </Form>
      </PageContainer>
    </>
  )
}

export default Index
