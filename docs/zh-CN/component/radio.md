---
title: Radio 单选框
lang: zh-CN
---

# Radio 单选框

在一组备选项中进行单选

:::warning

`label` 作为 `value` 来使用已经被 **废弃**, 建议`label` 只用来表示展示的文字，这个被废弃的用法**将会在** ^(3.0.0) 版本被移除，请考虑使用新 API 替换.

:::

:::tip

新的 API `value` 已在 ^(2.6.0) 版本添加，文档中的示例都将使用 `value`。如果您使用的版本 **低于** ^(2.6.0)，请参考：

:::

```vue
<template>
  <el-radio-group v-model="radio1">
    <!-- works when >=2.6.0, recommended ✔️ not work when <2.6.0 ❌ -->
    <el-radio value="Value 1">Option 1</el-radio>
    <!-- works when <2.6.0, deprecated act as value when >=3.0.0 -->
    <el-radio label="Label 2 & Value 2">Option 2</el-radio>
  </el-radio-group>
</template>
```

## 基础用法

单选框不应该有太多的可选项，如果你有很多的可选项你应该使用选择框而不是单选框。

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `value`属性的值， `value`可以是`String`、`Number` 或 `Boolean`。

radio/basic-usage

:::

## 禁用状态

`disabled` 属性可以用来控制单选框的禁用状态。

:::demo 你只需要为单选框设置 `disabled` 属性就能控制其禁用状态。

radio/disabled

:::

## 单选框组

适用于在多个互斥的选项中选择的场景

:::demo 结合`el-radio-group`元素和子元素`el-radio`可以实现单选组，为 `el-radio-group` 绑定 `v-model`，再为 每一个 `el-radio` 设置好 `label` 属性即可，另外，还可以通过 `change` 事件来响应变化，它会传入一个参数 `value` 来表示改变之后的值。

radio/radio-group

:::

## 带有边框

:::demo 设置 `border` 属性为 true 可以渲染为带有边框的单选框。

radio/with-borders

:::

## Options 属性 ^(2.11.2)

:::demo 基础用法 `el-radio-group` 的快捷示例。您可以通过 `props` 属性自定义 `options` 的别名。

radio/options

:::

## 单选按钮

带有按钮组视觉效果的单选框

:::demo 只需要把 `el-radio` 元素换成 `el-radio-button` 元素即可， :::demo 您可以使用 `填充` 和 `文本颜色` 设置按钮的样式。

radio/radio-button

:::

## Radio API

### Radio Attributes

| 属性名                   | 说明                                           | 类型                                         | 默认值   |
| --------------------- | -------------------------------------------- | ------------------------------------------ | ----- |
| model-value / v-model | 选中项绑定值                                       | ^[string] / ^[number] / ^[boolean]         | —     |
| value ^(2.6.0)        | 单选框的值                                        | ^[string] / ^[number] / ^[boolean]         | :::   |
| label                 | 单选框的 label 如果`value`没有值， `label`则作为`value`使用 | ^[string] / ^[number] / ^[boolean]         | :::   |
| disabled              | 是否禁用单选框                                      | ^[boolean]                                 | false |
| border                | 是否显示边框                                       | ^[boolean]                                 | false |
| size                  | 单选框的尺寸                                       | ^[enum]`'large' \| 'default' \| 'small'` | —     |
| name                  | 原始 `name` 属性                                 | ^[string]                                  | —     |

### Radio Events

| 事件名    | 说明          | 类型                                                             |
| ------ | ----------- | -------------------------------------------------------------- |
| change | 绑定值变化时触发的事件 | ^[Function]`(value: string \| number \| boolean) => void` |

### Radio Slots

| 插槽名     | 说明      |
| ------- | ------- |
| default | 自定义默认内容 |

## RadioGroup API

### RadioGroup Attributes

| 属性名                         | 说明                                                            | 类型                                                              | 默认值                                                      |
| --------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| model-value / v-model       | 绑定值                                                           | ^[string] / ^[number] / ^[boolean]                              | —                                                        |
| size                        | 单选框按钮或边框按钮的大小                                                 | ^[string]                                                       | default                                                  |
| disabled                    | 是否禁用                                                          | ^[boolean]                                                      | false                                                    |
| validate-event              | 输入时是否触发表单的校验                                                  | ^[boolean]                                                      | true                                                     |
| text-color                  | 按钮形式的 Radio 激活时的文本颜色                                          | ^[string]                                                       | #ffffff                                                  |
| fill                        | 按钮形式的 Radio 激活时的填充色和边框色                                       | ^[string]                                                       | #409eff                                                  |
| aria-label ^(a11y) ^(2.7.2) | 与 RadioGroup 中的 `aria-label` 属性相同                             | ^[string]                                                       | —                                                        |
| name                        | 原生 `name` 属性                                                  | ^[string]                                                       | —                                                        |
| id                          | 原生 `id` 属性                                                    | ^[string]                                                       | —                                                        |
| label ^(a11y) ^(deprecated) | 与 RadioGroup 中的 `aria-label` 属性相同                             | ^[string]                                                       | —                                                        |
| options ^(2.11.2)           | 选项的数据源， `value` 的 key 和 `label` 和 ` disabled`可以通过 `props`自定义. | ^[array]`Array<{[key: string]: any}>`                     | —                                                        |
| props ^(2.11.2)             | options 的配置                                                   | ^[object]`{ value?: string, label?: string, disabled?: string}` | `{value: 'value', label: 'label', disabled: 'disabled'}` |
| type ^(2.11.5)              | 用于渲染选项的组件类型（例如 `'button'`）                                    | ^[enum]`'radio' \| 'button'`                                   | 'radio'                                                  |

### RadioGroup Events

| 事件名    | 说明          | 类型                                                             |
| ------ | ----------- | -------------------------------------------------------------- |
| change | 绑定值变化时触发的事件 | ^[Function]`(value: string \| number \| boolean) => void` |

### RadioGroup Slots

| 插槽名     | 说明      | 子标签                 |
| ------- | ------- | ------------------- |
| default | 自定义默认内容 | Radio / RadioButton |

## RadioButton API

### RadioButton Attributes

| 名称             | 详情                                         | 类型                                 | 默认    |
| -------------- | ------------------------------------------ | ---------------------------------- | ----- |
| value ^(2.6.0) | 单选框的值                                      | ^[string] / ^[number] / ^[boolean] | —     |
| label          | 单选框的 label 如果没有 value， `label`则作为`value`使用 | ^[string] / ^[number] / ^[boolean] | —     |
| disabled       | 是否禁用单选框                                    | ^[boolean]                         | false |
| name           | 原生 name 属性                                 | ^[string]                          | —     |

### RadioButton Slots

| 插槽名     | 说明     |
| ------- | ------ |
| default | 默认插槽内容 |
