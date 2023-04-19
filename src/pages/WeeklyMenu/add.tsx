import React, { useState } from "react"
import { Form, Modal, Space, Button, Select, message } from "antd"
import { useColumnsAdd } from "./columns"
import QueryForm from "@/components/QueryForm"
import PageContainer from "@/components/PageContainer/PageContainer"
import { ProFormText, ProFormSelect } from "@ant-design/pro-components"
import CustomTable from "@/components/CustomTable"
import { getProductList } from "../../api/foodmgr"
import { addLongOrShortDishes } from "@/api/weeklyMenu"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import useGetData from "@/hooks/useGetData"
import useMealTime from "@/hooks/useMealTime"
import useDishesClassify from "@/hooks/useDishesClassify"
import { useLocation, useNavigate } from "react-router-dom"
const Index: React.FC = () => {
  const cur_id = useSelector<RootState, number>(state => state.user.cur_id)
  const navigate = useNavigate()
  const locationState = useLocation()?.state
  const [formSearch] = Form.useForm()
  const [isAddmodal, setAddModal] = useState<boolean>(false)
  const [dishesID, setDishesID] = useState<number>()
  const [formAdd] = Form.useForm()
  const mealTime = useMealTime()
  const categoryList = useDishesClassify()
  const [oSrch, setSrch, data, isSendReq, setSendReq, loading] = useGetData(
    getProductList,
    {
      org_id: cur_id
    }
  )
  async function onAddDishes(vals: { time_quantum: string }) {
    const res: Resolve = await addLongOrShortDishes({
      ...locationState,
      product_id: dishesID,
      time_quantum: vals.time_quantum
    })
    if (res?.code === 200) {
      setSendReq(!isSendReq)
      message.success("添加菜品成功")
      setAddModal(false)
    }
  }

  return (
    <>
      <PageContainer
        title="添加菜品"
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
        <QueryForm
          onFinish={vals =>
            setSrch({ ...vals, page: 1, page_size: oSrch.page_size })
          }
          onReset={() => setSrch({ page: 1, page_size: oSrch.page_size })}
          form={formSearch}
        >
          <ProFormText name="name" label="菜品名称" />
          <ProFormSelect
            name="category"
            label="菜品分类"
            mode="single"
            options={categoryList}
          />
        </QueryForm>

        <CustomTable
          dataSource={data?.lists}
          loading={loading}
          columns={useColumnsAdd({
            handleAdd: (id: number) => {
              setDishesID(id)
              setAddModal(true)
              formAdd.resetFields()
            }
          })}
          pagination={{
            total: data?.total,
            current: oSrch.page,
            onChange: (page, page_size) =>
              setSrch({ ...oSrch, page, page_size })
          }}
        />
        <div style={{ height: "5vh" }} />
      </PageContainer>

      <Modal
        onCancel={() => setAddModal(false)}
        title="添加菜品"
        open={isAddmodal}
        footer={null}
      >
        <Form
          onFinish={onAddDishes}
          form={formAdd}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            name="time_quantum"
            label="就餐时间"
            rules={[{ required: true, message: "请选择就餐时间" }]}
          >
            <Select placeholder="请选择" allowClear>
              {mealTime?.map((item: any) => (
                <Select.Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => setAddModal(false)}>取消</Button>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default Index
