import { FC, useEffect, useState } from "react"
import { Button, Form, message, Modal, Tree, Space } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import { useColumnsIndex } from "./columns"
import useGetData from "@/hooks/useGetData"
import { listFunc, DelMenu, listApp } from "@/api/index"
import { useNavigate } from "react-router-dom"
import "./index.less"

const Index: FC = () => {
  const navigate = useNavigate()
  const [dataSource, setData] = useState([])
  const [appSelect, setAppSelect] = useState([])
  const [oSrch, setSrch, data, , , loading] = useGetData(listFunc, {
    desc: true,
    limit: 10,
    order_key: "id"
  })

  useEffect(() => {
    getAppSelect()
  }, [])

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
              label: item.client_desc
            }
          })
        )
      }
    })
  }

  const handleDelete = (props: any) => {
    DelMenu(props.id).then(r => {
      message.success("删除成功")
      setSrch({
        ...oSrch,
        page: 1,
        limit: 10
      })
    })
  }

  const handleEdit = (props: any) => {
    if (props.pid === 0) {
      props.pid = "0"
    }
    navigate("/scaffold/menu/edit?id=" + props.id)
  }

  return (
    <div className="Menumanage">
      <PageContainer
        title="功能管理"
        extra={
          <Space>
            <Button
              type="primary"
              onClick={() => navigate("/scaffold/menu/edit")}
            >
              新增
            </Button>
          </Space>
        }
      >
        <SearchForm
          onFinish={(vals: any) =>
            setSrch({ ...vals, page: 1, page_size: oSrch.page_size })
          }
          onReset={() => setSrch({ page: 1, page_size: oSrch.page_size })}
          appSelect={appSelect}
        />

        <CustomTable
          dataSource={data?.lists}
          loading={loading}
          scroll={{ x: 1500 }}
          columns={useColumnsIndex({
            handleEdit,
            handleDelete
          })}
          pagination={{
            total: data?.total,
            current: oSrch.page,
            onChange: (page, page_size) =>
              setSrch({ ...oSrch, page, page_size })
          }}
        />
      </PageContainer>
    </div>
  )
}

export default Index
