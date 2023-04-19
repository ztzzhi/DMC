import React, { useState, useEffect } from "react"
import { Form, Button, Space, Modal, Input, Avatar, Image, message } from "antd"
import { useColumnsIndex } from "./columns"
import QueryForm from "@/components/QueryForm"
import PageContainer from "@/components/PageContainer/PageContainer"
import Table from "@/components/Table"
import {
  ProFormText,
  ProFormDigit,
  ProFormSelect,
  CheckCard
} from "@ant-design/pro-components"
import { useFormEdit, IAxiosCategory } from "./useFormEdit"
import EditForm from "@/components/EditForm"
const { confirm } = Modal
import "./add.less"
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams
} from "react-router-dom"
import {
  getCategoryList,
  addProductList,
  getProductDetail
} from "@/api/rolemgrroot"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

const Index: React.FC = () => {
  const [formEdit] = Form.useForm()
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const [detail, setDetail] = useState({})
  const id = query.get("id")
  const [categoryList, setCategoryList] = useState([])
  const [sendLoading, setSendLoading] = useState(false)
  const cur_id = useSelector<RootState, number>(state => state.user.cur_id)

  useEffect(() => {
    fn()
    id && getDetail()
  }, [])

  const fn = async () => {
    const res = await getCategoryList({ org_id: cur_id })
    const categoryList = res?.data?.lists?.map((item: IAxiosCategory) => {
      return {
        label: item.name,
        value: item.id + ""
      }
    })
    setCategoryList(categoryList)
  }

  const getDetail = async () => {
    const res = await getProductDetail({ id, org_id: cur_id })
    setDetail(res.data)
    formEdit.setFieldsValue({
      ...res.data,
      category: res?.data?.category?.id
    })
  }

  const handleSave = () => {
    formEdit
      .validateFields()
      .then(async values => {
        setSendLoading(true)
        console.log(values)
        const params = {
          ...detail,
          ...values,
          cover_img: values.cover_img.toString(),
          detail_img: values.detail_img && values.detail_img.toString(),
          org_id: cur_id
        }
        const res = await addProductList(params)
        if (res.code === 200) {
          message.success(id ? "编辑成功" : "添加成功")
          setTimeout(() => {
            navigate(-1)
          }, 500)
        }
      })
      .catch(err => {
        setSendLoading(false)
        if (err?.errorFields && err?.errorFields[0]?.errors[0]) {
          message.error(err?.errorFields[0]?.errors[0])
        } else {
          message.error("系统异常")
        }
      })
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="rolemgrroot_add">
      <PageContainer
        title={id ? "菜品编辑" : "菜品新增"}
        footer={
          <>
            <Space>
              <Button onClick={handleBack}>返回</Button>
              <Button type="primary" onClick={handleSave} loading={sendLoading}>
                提交
              </Button>
            </Space>
          </>
        }
      >
        <div className="container">
          <EditForm
            isNotModal={true}
            formConfigArray={useFormEdit({ categoryList })}
            form={formEdit}
          ></EditForm>
        </div>
      </PageContainer>
    </div>
  )
}

export default Index
