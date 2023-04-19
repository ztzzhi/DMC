import { FormInstance } from "antd"

const useBatchCrate = (type: FormInstance[], num: number) => {
  return Array.from({ length: num }, () => type?.[0])
}
export default useBatchCrate
