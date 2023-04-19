import React, { useState, useEffect } from "react"
import {
  Form,
  Space,
  Button,
  Select,
  message,
  Row,
  Col,
  Input,
  TreeSelect
} from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { appidSetRoule, listApp } from "@/api/index"
import { GetRoleSelectData } from "@/api/userrole"

const Index: React.FC = () => {
  const navigate = useNavigate()
  const props = useLocation()
  const [form] = Form.useForm()
  const [appSelect, setAppSelect] = useState([])
  const [selectData, setSelectData] = useState([])
  const [query] = useSearchParams()
  const id = query.get("id")

  useEffect(() => {
    getAppSelect()
    getList()
  }, [])

  const getList = async () => {
    const res = await GetRoleSelectData()
    setSelectData(res?.data?.lists || [])
  }

  const getAppSelect = (params = { page: 1, limit: 100 }) => {
    listApp(params).then((r: any) => {
      if (r.code === 200) {
        setAppSelect(r.data.lists)
      }
    })
  }

  const onSubmit = () => {
    const value = form.getFieldsValue()
    id && (value.id = id)
    appidSetRoule(value).then((r: any) => {
      message.success("修改成功", 2)
      navigate(-1)
    })
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <>
      <PageContainer
        title="编辑角色"
        footer={
          <>
            <Space>
              <Button type="primary" onClick={() => navigate(-1)}>
                返回
              </Button>
            </Space>
          </>
        }
      >
        <Form form={form} initialValues={props.state}>
          <div className="steps-content">
            <Row className="one_row">
              <Col span={7}></Col>
              <Col span={10}>
                {/* 模块生成属性收集 */}
                <Form.Item
                  extra="设置角色所属应用"
                  label="所属应用"
                  name="client_id"
                >
                  <Select>
                    {appSelect.map((value: any, index) => {
                      return (
                        <Select.Option key={index + 1} value={value.client_id}>
                          {value.client_desc}-{value.client_id}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </Form.Item>

                <Form.Item label="角色名称" name="role_name">
                  <Input />
                </Form.Item>

                <Form.Item
                  extra="设置角色所属父级"
                  label="所属父级"
                  name="client_father"
                >
                  <TreeSelect
                    showSearch
                    treeNodeFilterProp="role_name"
                    fieldNames={{
                      label: "role_name",
                      value: "id",
                      children: "children"
                    }}
                    allowClear
                    treeDefaultExpandAll
                    treeData={selectData}
                    style={{
                      width: "100%"
                    }}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto"
                    }}
                  ></TreeSelect>
                </Form.Item>

                <Form.Item
                  extra="设置功能唯一标识"
                  label="角色标识"
                  name="role_key"
                >
                  <Input />
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
