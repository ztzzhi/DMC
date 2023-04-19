interface Iprops {
  categoryList: categoryListArr[]
}

export interface categoryListArr {
  label: string
  value: number
}

export interface IAxiosCategory {
  id: string
  name?: string
  deleted_at?: any
  created_at?: string
  updated_at?: string
  org_id?: number
  object_id?: number
  client_id?: string
}

export function useFormEdit({ categoryList }: Iprops) {
  return [
    {
      name: "name",
      label: "菜品名称",
      type: "Input",
      placeholder: "请输入菜品名称",
      rules: [{ required: true, message: "请输入菜品名称" }],
      config: {
        showCount: true,
        maxLength: 20
      }
    },
    {
      name: "category",
      label: "菜品分类",
      type: "Select",
      option: categoryList,
      placeholder: "请选择菜品分类",
      rules: [
        {
          required: true,
          message: "请选择菜品分类"
        }
      ]
    },
    {
      name: "price",
      label: "菜品单价",
      type: "InputNumber",
      placeholder: "请输入菜品单价",
      rules: [
        { required: true, message: "请输入菜品单价" },
        {
          validator: (_: any, value: number) => {
            if (value === null) {
              return Promise.reject()
            } else if (value <= 0) {
              return Promise.reject(new Error("菜品单价必须大于0"))
            } else {
              return Promise.resolve()
            }
          }
        }
      ]
    },
    {
      name: "packing_price",
      label: "包装费",
      type: "InputNumber",
      placeholder: "请输入包装费",
      rules: [
        { required: true, message: "请输入包装费" },
        {
          validator: (_: any, value: number) => {
            if (value === null) {
              return Promise.reject()
            } else if (value < 0) {
              return Promise.reject(new Error("包装费必须大于等于0"))
            } else {
              return Promise.resolve()
            }
          }
        }
      ]
    },
    {
      name: "stock",
      label: "库存",
      type: "InputNumber",
      placeholder: "请输入库存",
      rules: [
        { required: true, message: "请输入库存" },
        {
          validator: (_: any, value: number) => {
            if (value === null) {
              return Promise.reject()
            } else if (value < 0) {
              return Promise.reject(new Error("库存必须大于等于0"))
            } else if ((value + "").indexOf(".") !== -1) {
              return Promise.reject(new Error("库存必须是整数"))
            } else {
              return Promise.resolve()
            }
          }
        }
      ]
    },
    {
      name: "desc",
      label: "菜品描述",
      type: "TextArea",
      config: { rows: 4, showCount: true, maxLength: 30 },
      placeholder: "请输入菜品描述"
    },
    {
      name: "materials",
      label: "原料",
      type: "Input",
      placeholder: "请输入原料",
      config: {
        showCount: true,
        maxLength: 30
      }
    },
    {
      name: "measure",
      label: "份量",
      type: "Input",
      placeholder: "请输入份量",
      config: {
        showCount: true,
        maxLength: 10
      }
    },
    {
      name: "taste",
      label: "口味",
      type: "Input",
      placeholder: "请输入口味",
      config: {
        showCount: true,
        maxLength: 10
      }
    },
    {
      name: "cover_img",
      label: "菜品封面",
      rules: [{ required: true, message: "请上传菜品封面" }],
      config: { max: 1 },
      type: "Upload"
    },
    {
      name: "detail_img",
      label: "详情图",
      config: { max: 1 },
      type: "Upload"
    }
  ]
}
export function useFormIn() {
  return [
    {
      name: "num",
      label: "入库数量",
      type: "InputNumber",
      rules: [{ required: true, message: "请输入入库数量" }]
    }
  ]
}
export function useFormOut() {
  return [
    {
      name: "reason",
      label: "出库原因",
      type: "TextArea",
      config: { rows: 4 },
      rules: [{ required: true, message: "请输入出库原因" }]
    },
    {
      name: "num",
      label: "出库数量",
      type: "InputNumber",
      rules: [{ required: true, message: "请输入出库数量" }]
    }
  ]
}
