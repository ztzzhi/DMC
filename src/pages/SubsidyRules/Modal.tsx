import { useEffect } from "react"
import { Modal, InputNumber } from "antd"
import { useState } from "react"
export function AddModal(props: ModalProps) {
  const { open, onConfirm, onCancel } = props
  const [data, setData] = useState<Record<string, number | null>>()
  useEffect(() => {
    setData({})
  }, [open])
  return (
    <Modal
      title="新增规则"
      open={open}
      onOk={() => onConfirm(data)}
      onCancel={onCancel}
    >
      <div>
        当老人年龄为&nbsp;&nbsp;
        <span style={{ width: "60px", display: "inline-block" }}>
          <InputNumber
            min={1}
            max={199}
            value={data?.min_age}
            onChange={num => setData({ ...data, min_age: num })}
          />
        </span>
        &nbsp;&nbsp;周岁 ~ &nbsp;&nbsp;
        <span style={{ width: "60px", display: "inline-block" }}>
          <InputNumber
            min={1}
            max={199}
            value={data?.max_age}
            onChange={num => setData({ ...data, max_age: num })}
          />
        </span>
        &nbsp;&nbsp;周岁时，可享受优惠折扣&nbsp;&nbsp;
        <span style={{ width: "60px", display: "inline-block" }}>
          <InputNumber
            min={0}
            max={10}
            value={data?.discount}
            onChange={num => setData({ ...data, discount: num })}
          />
        </span>
        &nbsp;&nbsp;折，每人每天优惠总额不超过&nbsp;&nbsp;
        <span style={{ width: "55px", display: "inline-block" }}>
          <InputNumber
            min={0}
            max={999}
            value={data?.max_amount}
            style={{ width: "55px", marginTop: 15 }}
            onChange={num => setData({ ...data, max_amount: num })}
          />
        </span>
        &nbsp;&nbsp;元
      </div>
    </Modal>
  )
}
export function EditModal(props: ModalProps) {
  const { open, editMag, onConfirm, onCancel } = props
  const [data, setData] = useState<Record<string, number | null>>()
  useEffect(() => {
    setData(editMag)
  }, [open])

  return (
    <Modal
      title="编辑规则"
      open={open}
      onOk={() => onConfirm(data)}
      onCancel={onCancel}
    >
      <div>
        当老人年龄为&nbsp;&nbsp;
        <span style={{ width: "60px", display: "inline-block" }}>
          <InputNumber
            min={1}
            max={199}
            value={data?.min_age}
            onChange={num => setData({ ...data, min_age: num })}
          />
        </span>
        &nbsp;&nbsp;周岁 ~ &nbsp;&nbsp;
        <span style={{ width: "60px", display: "inline-block" }}>
          <InputNumber
            min={1}
            max={199}
            value={data?.max_age}
            onChange={num => setData({ ...data, max_age: num })}
          />
        </span>
        &nbsp;&nbsp;周岁时，可享受优惠折扣&nbsp;&nbsp;
        <span style={{ width: "60px", display: "inline-block" }}>
          <InputNumber
            min={0}
            max={10}
            value={data?.discount}
            onChange={num => setData({ ...data, discount: num })}
          />
        </span>
        &nbsp;&nbsp;折，每人每天优惠总额不超过&nbsp;&nbsp;
        <span style={{ width: "55px", display: "inline-block" }}>
          <InputNumber
            min={0}
            max={999}
            value={data?.max_amount}
            style={{ width: "55px", marginTop: 15 }}
            onChange={num => setData({ ...data, max_amount: num })}
          />
        </span>
        &nbsp;&nbsp;元
      </div>
    </Modal>
  )
}
