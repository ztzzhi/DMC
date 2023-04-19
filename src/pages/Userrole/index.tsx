import { FC, useEffect, useState } from "react"
import { Form, message, Modal, Tree, Space, Button } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import { useColumnsIndex } from "./columns"
import useGetData from "@/hooks/useGetData"
import {
  listRouleUser,
  RouleToFunc,
  RouleIdGetFuncIds,
  appidGetUserRoule,
  DelRoule
} from "../../api/userrole"
import { listApp } from "../../api/index"
import { useNavigate } from "react-router-dom"
import useBatchCrate from "@/hooks/useBatchCrate"
import "./index.less"

const Index: FC = () => {
  const navigate = useNavigate()
  const [appSelect, setAppSelect] = useState([])
  const [isModalOpen, setModelOpen] = useState(false)
  const [ModalTitle, setModelTitle] = useState("角色绑定功能")
  const [ModalRouleId, setModelRouleId] = useState("")
  const [CheckboxMap, setCheckboxMap] = useState([])
  const [CheckboxMapDef, setCheckboxMapDef] = useState([])
  const [checked, setChecked] = useState([])
  const [client_id, setClientid] = useState("")
  const [oSrch, serSrch, data, , , loading] = useGetData(listRouleUser, {
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
    DelRoule(props.id).then((r: any) => {
      if (r.code === 200) {
        serSrch({
          ...oSrch,
          page: 1,
          limit: 10,
          client_id: "",
          role_key: ""
        })
      }
    })
  }

  const handleEdit = (props: any) => {
    navigate("/user/roule/edit?id=" + props.id)
  }

  const handleShowModel = (props: any) => {
    setClientid(props.client_id)
    RouleIdGetFuncIds(
      props.role_key.toString(),
      props.client_id.toString()
    ).then((r: any) => {
      if (r.code == 200) {
        setCheckboxMapDef(r.data)
        appidGetUserRoule(props.client_id).then((r: any) => {
          if (r.code === 200) {
            setCheckboxMap(r.data)
          }
        })
        setModelTitle(props.role_name + "-" + props.client_id + "-绑定功能")
        setModelRouleId(props.role_key)
        setModelOpen(true)
      }
    })
  }

  const onTreeCheck = (checkedKeys: any, e: any) => {
    setChecked(checkedKeys.checked)
  }

  const handleOk = () => {
    const req = {
      func_id: checked,
      roule_id: ModalRouleId,
      client_id
    }
    RouleToFunc(req).then((r: any) => {
      if (r.code == 200) {
        message.success(`绑定成功`, 2)
        handleCancel()
      }
    })
  }

  const handleCancel = () => {
    setCheckboxMapDef([])
    setCheckboxMap([])
    setModelOpen(false)
    setClientid("")
  }

  return (
    <div className="user_role">
      <PageContainer
        title="角色管理"
        extra={
          <Space>
            <Button type="primary" onClick={() => navigate("/user/roule/edit")}>
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
          isnotdoubleColor
          loading={loading}
          scroll={{ x: 1500 }}
          columns={useColumnsIndex({
            handleShowModel,
            handleEdit,
            handleDelete
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
        {CheckboxMap?.length ? (
          <Tree
            checkable
            defaultExpandAll={true}
            fieldNames={{ title: "title", key: "id", children: "children" }}
            defaultCheckedKeys={CheckboxMapDef}
            onCheck={onTreeCheck}
            checkStrictly={true}
            showLine={true}
            treeData={[...CheckboxMap]}
          />
        ) : null}
      </Modal>
    </div>
  )
}

export default Index
