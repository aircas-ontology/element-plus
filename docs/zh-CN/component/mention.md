---
title: Mention 提及
lang: zh-CN
---

# Mention 提及

用于在输入中提及某人或某事。

## 基础用法

最简单的用法。

:::demo

mention/basic

:::

## Props ^(2.11.3)

你可以通过 `props` 属性自定义 `options` 的别名。

:::demo

mention/props

:::

## Textarea

输入类型可以设置为 `textarea` 。

:::demo

mention/textarea

:::

## 自定义标签

使用 "label" 自定义标签。

:::demo

mention/label

:::

## 加载远程选项

异步加载选项。

:::demo

mention/loading

:::

## 自定义触发字段

通过 `prefix` 属性 自定义触发字段。默认为 `@`, `Array<string>` 。

:::demo

mention/prefix

:::

## 整体删除

将`whole`属性设置为 `true`，当您按下退格键时，此处的 mention 区域将作为一个整体被删除。设置 "check-is-whole" 属性来自定义检查逻辑。
:::demo

mention/whole

:::

## 在表单里使用

与 `el-form` 一起使用

:::demo

mention/form

:::

:::tip
由于这个组件是基于[`el-input`](./input.md#attributes)派生的，他们的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。
:::

## API

### 属性

| 名称                                                                        | 说明                                                             | 类型                                                                                                                                                                                   | 默认值                                                           |
| ------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| options                                                                   | 提及选项列表                                                         | ^[array]`MentionOption[]`                                                                                                        | `[]`                                                          |
| props ^(2.11.3)        | options 的配置                                                    | ^[object]`MentionOptionProps`                                                                                                    | `{value: 'value', label: 'label', disabled: 'disabled'}`      |
| prefix                                                                    | 触发字段的前缀。字符串长度必须且只能为 1                                          | ^[string] \| ^[array]`string[]`                                              | `'@'`                                                         |
| split                                                                     | 用于拆分提及的字符。字符串长度必须且只能为 1                                        | ^[string]                                                                                                                        | `' '`                                                         |
| filter-option                                                             | 定制筛选器选项逻辑                                                      | ^[false] \| ^[Function]`(pattern: string, option: MentionOption) => boolean` | —                                                             |
| placement                                                                 | 设置弹出位置                                                         | ^[string]`'bottom' \| 'top'`                                                                                                     | `'bottom'`                                                    |
| show-arrow                                                                | 下拉菜单的内容是否有箭头                                                   | ^[boolean]                                                                                                                       | `false`                                                       |
| offset                                                                    | 下拉面板偏移量                                                        | ^[number]                                                                                                                        | `0`                                                           |
| whole                                                                     | 当退格键被按下做删除操作时，是否将提及部分作为整体删除                                    | ^[boolean]                                                                                                                       | `false`                                                       |
| check-is-whole                                                            | 当退格键被按下做删除操作时，检查是否将提及部分作为整体删除                                  | ^[Function]`(pattern: string, prefix: string) => boolean`                                                                        | —                                                             |
| loading                                                                   | 提及的下拉面板是否处于加载状态                                                | ^[boolean]                                                                                                                       | `false`                                                       |
| model-value / v-model                                                     | 输入值                                                            | ^[string]                                                                                                                        | —                                                             |
| popper-class                                                              | 自定义浮层类名                                                        | ^[string] / ^[object]                                                        | ^[string] |
| popper-style ^(2.11.5) | 自定义浮层类名                                                        | ^[string] / ^[object]                                                        | —                                                             |
| popper-options                                                            | [popper.js](https://popper.js.org/docs/v2/) 参数 | ^[object] refer to [popper.js doc](https://popper.js.org/docs/v2/)                                               | —                                                             |
| [input props](./input.md#attributes)                                      | —                                                              | —                                                                                                                                                                                    | —                                                             |

### 事件

| 名称                                                                        | 说明                                                                  | 类型                                                                                                               |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| search                                                                    | 按下触发字段时触发                                                           | ^[Function]`(pattern: string, prefix: string) => void`       |
| select                                                                    | 当用户选择选项时触发                                                          | ^[Function]`(option: MentionOption, prefix: string) => void` |
| whole-remove ^(2.10.4) | 当整个 mention 被移除，且 `whole` 为 `true` 或 `check-is-whole` 为 `true` 时触发。 | ^[Function]`(pattern: string, prefix: string) => void`       |
| [input events](./input.md#events)                                         | —                                                                   | —                                                                                                                |

### Slots

| 名称                              | 说明            | 类型                                                                                                    |
| ------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| label                           | 自定义标签内容       | ^[object]`{ item: MentionOption, index: number }` |
| loading                         | 自定义 loading内容 | —                                                                                                     |
| header                          | 下拉列表顶部的内容     | —                                                                                                     |
| footer                          | 下拉列表底部的内容     | —                                                                                                     |
| [input slots](./input.md#slots) | —             | —                                                                                                     |

### Exposes

| 名称                                                                          | 说明              | 类型                                                                                          |
| --------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| input                                                                       | el-input 组件实例   | ^[object]`Ref<InputInstance \| null>`   |
| tooltip                                                                     | el-tooltip 组件实例 | ^[object]`Ref<TooltipInstance \| null>` |
| dropdownVisible ^(2.8.5) | tooltip 显示状态    | ^[object]`ComputedRef<boolean>`         |

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type MentionOption = {
  value?: string
  label?: string
  disabled?: boolean
  [key: string]: any
}

type MentionOptionProps = {
  value?: string
  label?: string
  disabled?: string
  [key: string]: string | undefined
}
```

</details>
