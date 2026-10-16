---
title: TimePicker 时间选择器
lang: zh-CN
---

# TimePicker 时间选择器

用于选择或输入日期

## 任意时间点

可以选择任意时间

:::demo 提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrow-control`属性则通过界面上的箭头进行选择。

time-picker/basic

:::

## 限制时间选择范围

您也可以限制时间选择范围。

:::demo 通过 `disabledHours`，`disabledMinutes` 和 `disabledSeconds` 限制可选时间范围。,

time-picker/basic-range

:::

## 任意时间范围

可选择任意的时间范围

:::demo 添加`is-range`属性即可选择时间范围。同样支持 `arrow-control` 属性。

time-picker/range

:::

## API

### Attributes

| 属性名                          | 说明                                                                                                        | 类型                                                                                                 | 默认                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------- |
| model-value / v-model        | 绑定值，如果它是数组，长度应该是 2                                                                                        | ^[number] / ^[string] / ^[object]`Date \| [Date, Date] \| [number, number] \| [string, string]` | ''                                 |
| readonly                     | 完全只读                                                                                                      | ^[boolean]                                                                                         | false                              |
| disabled                     | 禁用                                                                                                        | ^[boolean]                                                                                         | false                              |
| editable                     | 文本框可输入                                                                                                    | ^[boolean]                                                                                         | true                               |
| clearable                    | 是否显示清除按钮                                                                                                  | ^[boolean]                                                                                         | true                               |
| size                         | 输入框尺寸                                                                                                     | ^[enum]`'large' \| 'default' \| 'small'`                                                         | —                                  |
| placeholder                  | 非范围选择时的占位内容                                                                                               | ^[string]                                                                                          | ''                                 |
| start-placeholder            | 范围选择时开始日期的占位内容                                                                                            | ^[string]                                                                                          | —                                  |
| end-placeholder              | 范围选择时结束日期的占位内容                                                                                            | ^[string]                                                                                          | —                                  |
| is-range                     | 是否为时间范围选择                                                                                                 | ^[boolean]                                                                                         | false                              |
| arrow-control                | 是否使用箭头进行时间选择                                                                                              | ^[boolean]                                                                                         | false                              |
| popper-class                 | TimePicker 下拉框的类名                                                                                         | ^[string]                                                                                          | ''                                 |
| popper-style                 | 为 TimePicke 的下拉菜单自定义样式                                                                                    | ^[string] / ^[object]                                                                              | —                                  |
| popper-options               | 自定义 popper 选项，更多请参考 [popper.js](https://popper.js.org/docs/v2/)                                           | ^[object]`Partial<PopperOptions>`                                                            | {}                                 |
| fallback-placements ^(2.8.4) | Tooltip 可用的 positions 请查看[popper.js 文档](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) | ^[array]`Placement[]`                                                                              | ['bottom', 'top', 'right', 'left'] |
| placement ^(2.8.4)           | 下拉框出现的位置                                                                                                  | `展示位置`                                                                                             | bottom                             |
| range-separator              | 选择范围时的分隔符                                                                                                 | ^[string]                                                                                          | '-'                                |
| format                       | 显示在输入框中的格式                                                                                                | ^[string] 参考 [日期格式](./date-picker.md#date-formats)                                                 | —                                  |
| default-value                | 可选，选择器打开时默认显示的时间                                                                                          | ^[Date] / ^[array]`[Date, Date]`                                                                   | —                                  |
| value-format                 | 可选，绑定值的格式。不指定则绑定值为 Date 对象                                                                                | ^[string] 参考 [日期格式](./date-picker.md#date-formats)                                                 | —                                  |
| id                           | 等价于原生 input `id` 属性                                                                                       | ^[string] / ^[array]`[string, string]`                                                             | —                                  |
| name                         | 等价于原生 input `name` 属性                                                                                     | ^[string]                                                                                          | ''                                 |
| aria-label ^(a11y) ^(2.7.2)  | 等价于原生 input `aria-label` 属性                                                                               | ^[string]                                                                                          | —                                  |
| prefix-icon                  | 自定义前缀图标                                                                                                   | ^[string] / ^[Component]                                                                           | Clock                              |
| clear-icon                   | 自定义清除图标                                                                                                   | ^[string] / ^[Component]                                                                           | CircleClose                        |
| disabled-hours               | 禁止选择部分小时选项                                                                                                | ^[Function]`(role: string, comparingDate?: Dayjs) => number[]`                                  | —                                  |
| disabled-minutes             | 禁止选择部分分钟选项                                                                                                | ^[Function]`(hour: number, role: string, comparingDate?: Dayjs) => number[]`                    | —                                  |
| disabled-seconds             | 禁止选择部分秒选项                                                                                                 | ^[Function]`(hour: number, minute: number, role: string, comparingDate?: Dayjs) => number[]`    | —                                  |
| teleported                   | 是否将 popover 的下拉列表镜像至 body 元素                                                                              | ^[boolean]                                                                                         | true                               |
| tabindex                     | 输入框的 tabindex                                                                                             | ^[string] / ^[number]                                                                              | 0                                  |
| empty-values ^(2.7.0)        | 组件的空值配置， [参考config-provider](./config-provider.md#empty-values-configurations)                            | ^[array]                                                                                           | —                                  |
| value-on-clear ^(2.7.0)      | 清空选项的值， [参考config-provider](./config-provider.md#empty-values-configurations)                             | ^[string] / ^[number] / ^[boolean] / ^[Function]                                                   | —                                  |
| save-on-blur ^(2.13.4)       | 当未选择任何值时，是否在获得焦点时自动填充为当前时间。                                                                               | ^[boolean]                                                                                         | true                               |
| label ^(a11y) ^(deprecated)  | 等价于原生 input `aria-label` 属性                                                                               | ^[string]                                                                                          | —                                  |

### 事件

| 事件名            | 说明                         | 类型                                                                                                                   |
| -------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| change         | 用户确认选定的值时触发                | ^[Function]`(val: number \| string \| Date \| [number, number] \| [string, string] \| [Date, Date]) => void` |
| blur           | 在组件 Input 失去焦点时触发          | ^[Function]`(e: FocusEvent) => void`                                                                              |
| focus          | 在组件 Input 获得焦点时触发          | ^[Function]`(e: FocusEvent) => void`                                                                              |
| clear ^(2.7.7) | 可清空的模式下用户点击清空按钮时触发         | ^[Function]`() => void`                                                                                           |
| visible-change | 当 TimePicker 的下拉列表出现/消失时触发 | ^[Function]`(visibility: boolean) => void`                                                                        |

### 暴露

| 名称                    | 说明        | Type                       |
| --------------------- | --------- | -------------------------- |
| focus                 | 使组件获取焦点   | ^[Function]`() => void` |
| blur                  | 使组件失去焦点   | ^[Function]`() => void` |
| handleOpen ^(2.2.16)  | 打开时间选择器弹窗 | ^[Function]`() => void` |
| handleClose ^(2.2.16) | 关闭时间选择器弹窗 | ^[Function]`() => void` |

## Type Declarations

<details>
  <summary>Show declarations</summary>

```ts
type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
```

</details>
