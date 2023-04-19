import React from "react"
import { Table } from "antd"

export default function Index(props) {
  const onShowChange = (page, size) => {
    props.pagesize(page, size)
  }

  return (
    <Table
      rowKey="id"
      dataSource={props.dataSource}
      rowClassName={(_, index) => (index % 2 === 1 ? "tableBac" : "")}
      columns={props.columns}
      pagination={{
        total: props.total,
        showSizeChanger: true,
        showQuickJumper: props.total > 50 ? true : false,
        showTotal: total => `共 ${total} 条`,
        pageSizeOptions: [10, 15, 20, 30],
        current: props.page || 1,
        onChange: onShowChange
      }}
      loading={props.loading}
      scroll={{ x: 500 }}
    />
  )
}
