# ckeditor-group_placeholder_select
CKEditor 分组占位符下拉选择器

# Example
```json
editorConfig: {
        toolbar: [
          ["Image"],
          ["Bold"],
          {
            name: "form",
            items: ["TextField", "Textarea", "Checkbox", "SelectionField"]
          },
          ["group_placeholder_select"]
        ],
        extraPlugins: "richcombo,group_placeholder_select",
        group_placeholder_select: {
          placeholders: [
            { group: "卖房信息【甲方】", options: ["客户名称", "客户身份证"] },
            {
              group: "买(租)房信息【乙方】",
              options: ["客户名称", "客户身份证"]
            },
            {
              group: "房产信息",
              options: ["坐落", "房号"]
            },
            {
              group: "公章",
              options: ["合同章", "财务章"]
            }
          ]
          // placeholders: ["客户名称", "客户身份证"] 
          // format: "{{%placeholder%}}"
        }
      },
```
