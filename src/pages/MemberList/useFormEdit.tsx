import { idCardValidator, phoneValidator } from "@/utils/validator"

export function useFormEdit(props: { readOnly?: boolean }) {
  return [
    {
      name: "name",
      label: "姓名",
      type: "Input",
      placeholder: "请输入姓名",
      rules: [{ required: true, message: "请输入姓名" }],
      config: {
        disabled: props.readOnly
      }
    },
    {
      name: "phone",
      label: "手机号",
      type: "Input",
      rules: [
        { required: true, message: "请输入手机号" },
        { validator: phoneValidator }
      ],
      placeholder: "请输入手机号",
      config: {
        disabled: props.readOnly
      }
    },
    {
      name: "id_card",
      label: "身份证号",
      type: "Input",
      placeholder: "请输入身份证号",
      rules: [
        { required: true, message: "请输入身份证号" },
        { validator: idCardValidator }
      ],
      config: {
        disabled: props.readOnly
      }
    },
    {
      name: "user_type",
      label: "老人类型",
      type: "Select",
      option: [
        { label: "低保", value: 1 },
        { label: "低边", value: 2 },
        { label: "特困", value: 3 },
        { label: "其他", value: 0 }
      ],
      placeholder: "请选择老人类型",
      rules: [
        {
          required: true,
          message: "请选择老人类型"
        }
      ]
    },
    {
      name: "sex",
      label: "性别",
      type: "Select",
      option: [
        { label: "男", value: 1 },
        { label: "女", value: 2 }
      ],
      placeholder: "请选择性别",
      rules: [
        {
          required: true,
          message: "请选择性别"
        }
      ],
      config: {
        disabled: props.readOnly
      }
    },
    {
      name: "age",
      label: "年龄",
      type: "InputNumber",
      placeholder: "请输入年龄",
      rules: [{ required: true, message: "请输入年龄" }],
      config: {
        disabled: props.readOnly,
        min: 1,
        parser: (value: string) =>
          value.indexOf(".") > -1 ? parseInt(value) : value
      }
    },

    {
      name: "address",
      label: "详细地址",
      type: "Input",
      placeholder: "请输入详细地址",
      config: {
        disabled: props.readOnly
      }
    },
    {
      name: "remark",
      label: "备注",
      type: "TextArea",
      config: { rows: 4, showCount: true, maxLength: 30 },
      placeholder: "请输入备注"
    },
    {
      name: "user_photo",
      label: "照片",
      tooltip: "用于刷脸点餐，请按标准上传",
      rules: [{ required: true, message: "请上传照片" }],
      config: { max: 3, disabled: props.readOnly },
      type: "Upload"
    },
    {
      name: "user_health_photo",
      tooltip: "低保、低边、特困老人凭证",
      label: "凭证",
      config: { max: 3, disabled: props.readOnly },
      type: "Upload"
    }
  ]
}
export function useFormOpenCard() {
  return [
    {
      name: "id_card",
      label: "卡面卡号",
      rules: [{ required: true, message: "请输入卡面卡号" }]
    },
    {
      name: "phone",
      label: "物理卡号",
      rules: [{ required: true, message: "请输入物理卡号" }]
    }
  ]
}
