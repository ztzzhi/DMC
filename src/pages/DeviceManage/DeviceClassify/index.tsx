import { useEffect, useState } from "react"
import { Tree, Button, Space, Modal, Form, Checkbox, TreeSelect } from "antd"
import type { TreeProps } from "antd/es/tree"
import CustomForm from "@/components/EditForm"
import { DownOutlined } from "@ant-design/icons"
import PageContainer from "@/components/PageContainer/PageContainer"
import { addClassify, deleClassify } from "@/api/deviceclassfly"
import { getDeviceClass } from "@/api/devicelist"
const { confirm } = Modal
const Index = () => {
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isEditModal, setEditModal] = useState<boolean>(false)
  const [id, setId] = useState<string | number>(0)
  const [name, setName] = useState<string | number>("")
  const [treeData, setTreeData] = useState<any>()
  const [isTopLevel, setTopLevel] = useState<boolean>(false)
  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const res = await getDeviceClass()
    res?.code === 200 && setTreeData(res?.data)
  }

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info: any) => {
    setId(selectedKeys[0] ?? 0)
    setName(info?.node?.name)
  }

  function onAdd() {
    form.validateFields().then(async (vals: any) => {
      const res = await addClassify({ pid: id, ...vals })
      if (res?.code === 200) {
        getData()
        setIsModal(false)
      }
    })
  }

  function openEditModal() {
    editForm.setFieldsValue({ name: name, pid: null })
    setTopLevel(false)
    setEditModal(true)
  }
  function onEdit() {
    editForm.validateFields().then(async (vals: any) => {
      const { name, pid } = vals
      const res = await addClassify({ id, name, pid: isTopLevel ? 0 : pid })
      if (res?.code === 200) {
        getData()
        setEditModal(false)
      }
    })
  }

  function onDele() {
    confirm({
      content: "确认删除节点？",
      onOk: async () => {
        const res = await deleClassify({ id })
        if (res?.code === 200) {
          getData()
        }
      }
    })
  }
  return (
    <div>
      <PageContainer
        title="设备分类"
        extra={
          <Space>
            <Button type="primary" onClick={() => setIsModal(true)}>
              {id === 0 ? "新增顶级" : "新增子级"}
            </Button>
            <Button
              style={{ display: id === 0 ? "none" : "" }}
              type="primary"
              onClick={openEditModal}
            >
              编辑
            </Button>
            <Button
              style={{ display: id === 0 ? "none" : "" }}
              type="primary"
              danger
              onClick={onDele}
            >
              删除
            </Button>
          </Space>
        }
      >
        {treeData?.length > 0 && (
          <Tree
            showLine
            defaultExpandAll={true}
            switcherIcon={<DownOutlined />}
            fieldNames={{ title: "name", key: "id" }}
            treeData={treeData}
            onSelect={onSelect}
          />
        )}

        <Modal
          title="添加"
          open={isModal}
          forceRender
          onOk={onAdd}
          onCancel={() => setIsModal(false)}
        >
          <CustomForm
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            form={form}
            formConfigArray={[
              {
                name: "name",
                label: "名称",
                type: "Input",
                placeholder: "请输入",
                rules: [
                  {
                    required: true,
                    message: "请输入"
                  }
                ]
              }
            ]}
          />
        </Modal>
        <Modal
          title="编辑"
          open={isEditModal}
          forceRender
          onOk={onEdit}
          onCancel={() => setEditModal(false)}
        >
          <CustomForm
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            form={editForm}
            formConfigArray={[
              {
                name: "name",
                label: "名称",
                type: "Input",
                placeholder: "请输入",
                rules: [
                  {
                    required: true,
                    message: "请输入"
                  }
                ]
              },
              {
                label: " ",
                type: "Custom",
                colon: false,
                rules: [
                  {
                    required: false
                  }
                ],
                content: (
                  <Checkbox
                    checked={isTopLevel}
                    onChange={e => setTopLevel(e.target.checked)}
                  >
                    是否移动到顶级
                  </Checkbox>
                )
              },
              {
                name: "pid",
                label: "移动节点",
                type: "Custom",
                placeholder: "请输入",
                rules: [
                  {
                    required: false
                  }
                ],
                content: (
                  <TreeSelect
                    disabled={isTopLevel}
                    showSearch
                    style={{ width: "100%" }}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    placeholder="请选择"
                    allowClear
                    treeDefaultExpandAll
                    fieldNames={{ value: "id", label: "name" }}
                    treeData={treeData}
                  />
                )
              }
            ]}
          />
        </Modal>
      </PageContainer>
    </div>
  )
}

export default Index
