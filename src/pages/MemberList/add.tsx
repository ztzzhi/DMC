import React, { useState, useEffect } from "react"
import { Form, Button, Space, message } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import { useFormEdit } from "./useFormEdit"
import EditForm from "@/components/EditForm"
import { addMemberlist } from "@/api/member"
import "./add.less"
import { useNavigate, useSearchParams } from "react-router-dom"
import { detailMemberlist } from "@/api/member"
import { useSelector } from "react-redux"
import { RootState } from "@/store"

const Index: React.FC = () => {
  const [formEdit] = Form.useForm()
  const [query] = useSearchParams()
  const [detail, setDetail] = useState<any>({})
  const navigate = useNavigate()
  const [sendLoading, setSendLoading] = useState(false)
  const id = query.get("id")
  const cur_id = useSelector<RootState, number>(state => state.user.cur_id)
  useEffect(() => {
    if (id) {
      getDetail()
    }
  }, [])

  const getDetail = async () => {
    const res = await detailMemberlist({ id, org_id: cur_id })
    setDetail(res.data)
    formEdit.setFieldsValue({
      ...res.data
    })
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleSave = () => {
    formEdit
      .validateFields()
      .then(async values => {
        if (!id) {
          const result = await detailMemberlist({
            phone: values.phone,
            org_id: cur_id
          })
          if (!(result?.data && result?.data?.length === 0)) {
            message.error("该手机号已经注册过了")
            return
          }
        }
        setSendLoading(true)
        const res = await addMemberlist({
          ...detail,
          ...values,
          phone: values.phone.toString(),
          user_photo: values.user_photo.toString(),
          user_health_photo:
            values.user_health_photo && values.user_health_photo.toString(),
          org_id: cur_id
        })
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

  return (
    <div className="member_add">
      <PageContainer
        title={id ? "会员编辑" : "会员新增"}
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
            formConfigArray={useFormEdit({
              readOnly: id ? !detail.is_edit : false
            })}
            form={formEdit}
          />
        </div>
      </PageContainer>
    </div>
  )
}

export default Index
