import React, { useState } from "react"
import { Table, Pagination } from "antd"
interface Props {
  dataSource?: any
  columns?: any
  scroll?: Record<string, number>
  loading?: boolean
  isnotdoubleColor?: boolean
  isSelection?: boolean
  selectRows?: (...set: any) => void
  pagination?: {
    total?: number | undefined
    current?: number
    onChange?: (page: number, pageSize: number) => void
  }
}
export default function CustomTable(props: Props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const { dataSource, loading, columns, scroll, pagination } = props
  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys)
    if (props.isSelection && typeof props.selectRows === "function") {
      props.selectRows(selectedRowKeys)
    }
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  return props.isSelection ? (
    <>
      <Table
        className="tableClass"
        rowSelection={rowSelection}
        rowClassName={
          props.isnotdoubleColor
            ? ""
            : (_, index) => (index % 2 === 1 ? "tableBac" : "")
        }
        dataSource={dataSource}
        rowKey={record => record.id}
        bordered
        columns={columns}
        scroll={scroll ?? { x: 1200 }}
        pagination={false}
        loading={loading}
        sticky
      />
      {!!pagination?.total && (
        <Pagination
          total={pagination.total}
          current={pagination.current}
          onChange={(page, pageSize) => pagination.onChange!(page, pageSize)}
          showSizeChanger={true}
          showQuickJumper={true}
          showTitle={true}
          showTotal={total => `共 ${total} 条`}
          style={{ textAlign: "right", marginTop: 15 }}
          pageSizeOptions={[10, 15, 20, 30]}
        />
      )}
    </>
  ) : (
    <>
      <Table
        className="tableClass"
        rowClassName={
          props.isnotdoubleColor
            ? ""
            : (_, index) => (index % 2 === 1 ? "tableBac" : "")
        }
        dataSource={dataSource}
        rowKey={record => record.id}
        bordered
        columns={columns}
        scroll={scroll ?? { x: 1200 }}
        pagination={false}
        loading={loading}
        sticky
      />
      {!!pagination?.total && (
        <Pagination
          total={pagination.total}
          current={pagination.current}
          onChange={(page, pageSize) => pagination.onChange!(page, pageSize)}
          showSizeChanger={true}
          showQuickJumper={true}
          showTitle={true}
          showTotal={total => `共 ${total} 条`}
          style={{ textAlign: "right", marginTop: 15 }}
          pageSizeOptions={[10, 15, 20, 30]}
        />
      )}
    </>
  )
}
