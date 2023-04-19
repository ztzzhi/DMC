export default function useFormEdit() {
  return [
    {
      name: "name",
      label: "名称",
      type: "Input",
      rules: [{ required: true, message: "Please select time!" }]
    },
    { name: "phone", label: "电话号码", type: "InputNumber" },
    {
      name: "selected",
      label: "下拉框示例",
      type: "Select",
      option: [
        { label: "一", value: 1 },
        { label: "二", value: 2 },
        { label: "三", value: 3 }
      ],
      rules: [
        {
          type: "array",
          required: true,
          message: "Please select time!"
        }
      ],
      config: {
        mode: "multiple",
        showSearch: true,
        optionFilterProp: "children"
      }
    },
    { name: "created_at", label: "创建时间", type: "DatePicker" },
    {
      name: "beignAndEnd",
      label: "时间段",
      type: "RangePicker",
      rules: [
        {
          type: "array",
          required: true,
          message: "Please select time!"
        }
      ]
    },
    {
      name: "status",
      label: "状态",
      type: "Switch",
      valuePropName: "checked"
    },
    {
      name: "imagelist",
      label: "图片上传",
      type: "Upload"
    }
  ]
}
