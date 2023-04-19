import React, { useState } from "react"
import { Table } from "antd"

export default function Index(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys)
    // 把已选中的参数传递给父组件
    props.selectRows(selectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const onShowChange = (page, size) => {
    props.pagesize(page, size)
  }

  return (
    <Table
      rowSelection={rowSelection}
      rowClassName={(_, index) => (index % 2 === 1 ? "tableBac" : "")}
      dataSource={props.dataSource}
      columns={props.columns}
      pagination={{
        total: props.total,
        showSizeChanger: true,
        showQuickJumper: props.total > 50 ? true : false,
        showTotal: total => `共 ${total} 条`,
        pageSizeOptions: [10, 15, 20, 30],
        current: props.page,
        onChange: onShowChange
      }}
      loading={props.loading}
      scroll={{ x: 500 }}
    />
  )
}
