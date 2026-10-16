---
title: Segmented
lang: zh-CN
---

# Segmented 分段控制器

用于展示多个选项并允许用户选择其中单个选项。

## 基础用法

设置`v-model`为选项值。

:::demo

segmented/basic

:::

## 配置方向^(2.8.7)

设置 `vertical` 来改变方向。

:::demo

segmented/custom-direction

:::

## 禁用状态

设置 `disabled` 属性来禁用一些选项。

:::demo

segmented/disabled

:::

## 自定义选项 ^(2.9.8)

当您的 `options` 格式不同于默认格式时，可通过 `props` 属性自定义 `options`

:::demo

segmented/props

:::

## Block 分段选择器

设置`block`为`true`以适应父元素的宽度。

:::demo

segmented/block

:::

## 自定义内容

设置 default slot 位来渲染自定义内容。

:::demo

segmented/custom-content

:::

## 自定义样式

使用 CSS 变量设置自定义样式。

:::demo

segmented/custom-style

:::

## API

### 属性

| 名称                                                                          | 说明                 | 类型                                                                                                                                                                                             | 默认值                                                    |
| --------------------------------------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| model-value / v-model                                                       | 绑定值                | ^[string] / ^[number] / ^[boolean] | —                                                      |
| options                                                                     | 选项的数据              | ^[array]`Option[]`                                                                                                                         | [] |
| [props](#props) ^(2.9.8) | 配置选项，详见下表          | ^[object]                                                                                                                                  | —                                                      |
| size                                                                        | 组件大小               | ^[enum]`'' \| 'large' \| 'default' \| 'small'`                                                                                             | ''                                                     |
| block                                                                       | 撑满父元素宽度            | ^[boolean]                                                                                                                                 | false                                                  |
| disabled                                                                    | 是否禁用               | ^[boolean]                                                                                                                                 | false                                                  |
| validate-event                                                              | 是否触发表单验证           | ^[boolean]                                                                                                                                 | true                                                   |
| name                                                                        | 原生 name 属性         | ^[string]                                                                                                                                  | —                                                      |
| id                                                                          | 原生 `id` 属性         | ^[string]                                                                                                                                  | —                                                      |
| aria-label ^(a11y)                                       | 原生 `aria-label` 属性 | ^[string]                                                                                                                                  | —                                                      |
| direction ^(2.8.7)       | 展示的方向              | ^[enum]`'horizontal' \| 'vertical'`                                                                                                        | horizontal                                             |

### props

| 属性       | 说明                | 类型                                                            | 默认值      |
| -------- | ----------------- | ------------------------------------------------------------- | -------- |
| value    | 指定键为节点对象的某个属性值    | ^[string] | value    |
| label    | 指定标签为节点对象的某个属性值   | ^[string] | label    |
| disabled | 指定禁用状态为节点对象的某个属性值 | ^[string] | disabled |

### 事件

| 名称     | 说明                  | 类型                                                                                  |
| ------ | ------------------- | ----------------------------------------------------------------------------------- |
| change | 当所选值更改时触发，参数是当前选中的值 | ^[Function]`(val: any) => void` |

### Slots

| 名称      | 说明            | 类型                                                                              |
| ------- | ------------- | ------------------------------------------------------------------------------- |
| default | 自定义 Option 模板 | ^[object]`{ item: Option }` |

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type Option = Record<string, any> | string | number | boolean
```

</details>
