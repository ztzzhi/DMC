import { FC, useState } from "react"
import { Button, Space } from "antd"
import PageContainer from "@/components/PageContainer/PageContainer"
import SearchForm from "./SearchForm"
import CustomTable from "@/components/CustomTable"
import { ShiftModal } from "./Modal"
import columns from "./columns"
const Index: FC = () => {
  const [isShiftModal, setShiftModal] = useState<boolean>(false)
  const data: any = [2]
  return (
    <>
      {" "}
      <PageContainer
        title="交接班记录"
        extra={
          <Space>
            <Button
              type="primary"
              style={{ margin: "10px 0" }}
              onClick={() => setShiftModal(true)}
            >
              交班
            </Button>
          </Space>
        }
      />
      <SearchForm onFinish={() => 1} />
      <CustomTable
        dataSource={data}
        columns={columns({ openEditModal: () => 1 })}
        pagination={{
          // total: tableData?.total,
          // current: oSrch.page,
          onChange: (page, pageSize) => 1
        }}
      />
      <ShiftModal
        open={isShiftModal}
        onConfirm={() => 1}
        onCancel={() => setShiftModal(false)}
      />
    </>
  )
}

export default Index
