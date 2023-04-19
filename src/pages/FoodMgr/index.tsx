import { Form, Modal, Space, Button, message } from "antd"
import { useColumnsIndex } from "./columns"
import QueryForm from "@/components/QueryForm"
import PageContainer from "@/components/PageContainer/PageContainer"
import Table from "@/components/Table"
import { ProFormField, ProFormSelect } from "@ant-design/pro-components"
import {
  getProductList,
  delProductList,
  changeProductStatus
} from "../../api/foodmgr"
import { ExclamationCircleOutlined } from "@ant-design/icons"
const { confirm } = Modal
import "./index.less"
import { useNavigate } from "react-router-dom"
import useGetData from "@/hooks/useGetData"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import useDishesClassify from "@/hooks/useDishesClassify"
const Index: React.FC = () => {
  const [formSearch] = Form.useForm()
  const navigate = useNavigate()
  const cur_id = useSelector<RootState, number>(state => state.user.cur_id)
  const categoryList = useDishesClassify()
  const [condition, setCondition, data, , , loading] = useGetData(
    getProductList,
    { org_id: cur_id }
  )

  const onFinish = (val: any) => {
    setCondition({ page: 1, page_size: condition.page_size, ...val })
  }

  const handleSwitch = async (id: number) => {
    const res = await changeProductStatus({ id, org_id: cur_id })
    if (res.code === 200) {
      message.success("操作成功")
      setCondition({ ...condition })
    }
  }

  // 设置每页分页的条数
  const getPageSize = (page: number, size: number) => {
    setCondition({ ...condition, page, page_size: size })
  }

  const handleEdit = (id: number) => {
    navigate("/menu/foodmgr/add?id=" + id)
  }

  const handleDel = (id: number) => {
    console.log(id, "asd")

    confirm({
      title: "确定删除此菜品吗?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        console.log("cancel")
        const res = await delProductList({ id, org_id: cur_id })
        if (res.code === 200) {
          message.success("删除成功")
          setCondition({ ...condition })
        }
      },
      onCancel() {
        console.log("Cancel")
      }
    })
  }

  const handleDetail = () => {
    navigate("/menu/foodmgr/detail?id=1")
  }

  return (
    <div className="foodmgr_list">
      <PageContainer
        title="菜品管理"
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => navigate("/menu/foodmgr/add")}
            >
              新增菜品
            </Button>
          </Space>
        }
      >
        <QueryForm
          onFinish={onFinish}
          onReset={() =>
            setCondition({ page: 1, page_size: condition.page_size })
          }
          form={formSearch}
        >
          <ProFormField name="name" label="菜品名称" />
          <ProFormSelect
            name="category"
            label="菜品分类"
            mode="single"
            options={categoryList}
          />
        </QueryForm>

        <Table
          dataSource={data?.lists}
          columns={useColumnsIndex({
            page: condition.page,
            pageSize: condition.page_size,
            handleEdit,
            handleDel,
            handleDetail,
            handleSwitch
          })}
          onChange={getPageSize}
          loading={loading}
          total={data?.total as number}
          page={condition.page}
        />
      </PageContainer>
    </div>
  )
}

export default Index
