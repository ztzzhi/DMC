import React, { useState } from "react"
import { MenuOutlined } from "@ant-design/icons"

import { Table } from "antd"
// import { arrayMoveImmutable, useRefFunction } from "@ant-design/pro-components"
// import {
//   SortableContainer,
//   SortableElement,
//   SortableHandle
// } from "react-sortable-hoc"

// const DragHandle = SortableHandle(() => (
//   <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
// ))
// import "./index.less"

// {
//   /* <TableOrder
//   dataSource={list}
//   columns={useColumns({
//     page: condition.page,
//     pageSize: condition.pageSize
//   })}
//   onChange={getPageSize}
//   loading={loading}
//   total={total}
//   page={condition.page}
// ></TableOrder> */
// }

// interface Iprops {
//   dataSource: any[]
//   columns: any[]
//   total: number
//   page: number
//   loading: boolean
//   isSelection?: boolean
//   selectRows?: (...set: any) => void
//   onChange: (...set: any) => void
// }

// export default function TableComponent(props: Iprops) {
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
//   const onSelectChange = (selectedRowKeys: React.Key[]) => {
//     setSelectedRowKeys(selectedRowKeys)
//     if (props.isSelection && typeof props.selectRows === "function") {
//       props.selectRows(selectedRowKeys)
//     }
//   }
//   const rowSelection = {
//     selectedRowKeys,
//     onChange: onSelectChange
//   }

//   const onChange = (page: number, size: number) => {
//     props.onChange(page, size)
//   }

//   const SortableItem = SortableElement((props: any) => <tr {...props} />)
//   const SortContainer = SortableContainer((props: any) => <tbody {...props} />)

//   const onSortEnd = useRefFunction(
//     ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
//       if (oldIndex !== newIndex) {
//         const newData = arrayMoveImmutable(
//           [...props.dataSource],
//           oldIndex,
//           newIndex
//         ).filter(el => !!el)
//         console.log([...newData], "[...newData][...newData][...newData]")
//       }
//     }
//   )

//   const DraggableContainer = (props: any) => (
//     <SortContainer
//       useDragHandle
//       disableAutoscroll
//       helperClass="row-dragging"
//       onSortEnd={onSortEnd}
//       {...props}
//     />
//   )

//   const DraggableBodyRow = (drawProps: any) => {
//     const { className, style, ...restProps } = drawProps
//     // 这里以id为唯独
//     const index = props.dataSource.findIndex(
//       (x: any) => x.id === restProps["data-row-key"]
//     )
//     return <SortableItem index={index} {...restProps} />
//   }

//   return props.isSelection ? (
//     <Table
//       bordered
//       rowKey="id"
//       rowSelection={rowSelection}
//       rowClassName={(_, index) => (index % 2 === 1 ? "tableBac" : "")}
//       dataSource={props.dataSource}
//       columns={[
//         {
//           title: "排序",
//           key: "sort",
//           dataIndex: "sort",
//           width: 70,
//           className: "drag-visible",
//           render: () => <DragHandle />
//         },
//         ...props.columns
//       ]}
//       pagination={{
//         total: props.total,
//         showSizeChanger: true,
//         showQuickJumper: props.total > 50 ? true : false,
//         showTotal: total => `共 ${total} 条`,
//         pageSizeOptions: [10, 15, 20, 30],
//         current: props.page,
//         onChange: onChange
//       }}
//       loading={props.loading}
//       scroll={{ x: 500 }}
//       components={
//         props?.dataSource?.length && props?.columns?.length
//           ? {
//               body: {
//                 wrapper: DraggableContainer,
//                 row: DraggableBodyRow
//               }
//             }
//           : undefined
//       }
//     />
//   ) : (
//     <Table
//       bordered
//       rowKey="id"
//       rowClassName={(_, index) => (index % 2 === 1 ? "tableBac" : "")}
//       dataSource={props.dataSource}
//       columns={[
//         {
//           title: "排序",
//           key: "sort",
//           dataIndex: "sort",
//           width: 70,
//           className: "drag-visible",
//           render: () => <DragHandle />
//         },
//         ...props.columns
//       ]}
//       pagination={{
//         total: props.total,
//         showSizeChanger: true,
//         showQuickJumper: props.total > 50 ? true : false,
//         showTotal: total => `共 ${total} 条`,
//         pageSizeOptions: [10, 15, 20, 30],
//         current: props.page,
//         onChange: onChange
//       }}
//       loading={props.loading}
//       scroll={{ x: 500 }}
//       components={
//         props?.dataSource?.length && props?.columns?.length
//           ? {
//               body: {
//                 wrapper: DraggableContainer,
//                 row: DraggableBodyRow
//               }
//             }
//           : undefined
//       }
//     />
//   )
// }
