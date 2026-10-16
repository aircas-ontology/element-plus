---
title: DatePickerPane 日期选择器面板
lang: zh-CN
---

# DatePickerPane 日期选择器面板 ^(beta)

`DatePickerPanel`是`DatePicker`的核心组件。

## 选择某一天

以”日“为基本单位，基础的日期选择控件

:::demo

date-picker-panel/basic

:::

## 边框

默认情况下，边框是默认的，如果你不想要边框请参考示例。例如，`DatePicker`不继承`border`。

:::demo

date-picker-panel/border

:::

## 禁用

"禁用"属性决定日期选择器是否完全禁用。

:::demo

date-picker-panel/disabled

:::

## 展示类型

时间面板的类型由 <code>type</code> 属性指定。

:::demo

date-picker-panel/all-types

:::

## 本地化

由于 Element Plus 的默认语言为英语，如果你需要设置其它的语言，请参考<a href="/zh-CN/guide/i18n">国际化</a>文档。

要注意的是：日期相关的文字（月份，每一周的第一天等等）也都进行了本地化配置。

## 应用开发接口（API）

### 属性

| 属性名                                                                       | 说明                                                                                                                                                                                             | 类型                                                                                                                                                                                                                                                                                         | 默认值                                                    |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| model-value / v-model                                                     | 绑定值，如果是 `range` 选择器，数组长度应为 2                                                                                                                                                                   | ^[number] / ^[string] / ^[Date] / ^[array]`number[] \| string[] \| Date[]` | ''                                                     |
| border                                                                    | 日期选择器是否有边框                                                                                                                                                                                     | ^[boolean]                                                                                                                                                                                                                             | true                                                   |
| disabled                                                                  | 禁用                                                                                                                                                                                             | ^[boolean]                                                                                                                                                                                                                             | false                                                  |
| clearable                                                                 | 是否显示清除按钮                                                                                                                                                                                       | ^[boolean]                                                                                                                                                                                                                             | true                                                   |
| editable ^(2.13.0)     | 文本框可输入                                                                                                                                                                                         | ^[boolean]                                                                                                                                                                                                                             | true                                                   |
| type                                                                      | type of the picker. `quarter`, `quarters`, and `quarterrange` are supported since ^(2.14.5)                                 | ^[enum]`'year' \| 'years' \|'month' \| 'months' \| 'date' \| 'dates' \| 'datetime' \| 'week' \| 'quarter' \| 'quarters' \| 'datetimerange' \| 'daterange' \| 'monthrange' \| 'yearrange' \| 'quarterrange'`                            | date                                                   |
| default-value                                                             | 可选，选择器打开时默认显示的时间                                                                                                                                                                               | ^[object]`Date \| [Date, Date]`                                                                                                                                                                                                        | —                                                      |
| default-time                                                              | 范围选择时选中日期所使用的当日内具体时刻                                                                                                                                                                           | ^[object]`Date \| [Date, Date]`                                                                                                                                                                                                        | —                                                      |
| value-format                                                              | 可选，绑定值的格式。不指定则绑定值为 Date 对象                                                                                                                                                                     | ^[string]                                                                                                                                                                                                                              | —                                                      |
| date-format                                                               | 可选，输入框内部面板中显示的日期格式                                                                                                                                                                             | ^[string] see [date formats](https://day.js.org/docs/en/display/format)                                                                                                                                                                | YYYY-MM-DD                                             |
| time-format                                                               | 可选，输入框内部面板中显示的时间格式                                                                                                                                                                             | ^[string] see [date formats](https://day.js.org/docs/en/display/format)                                                                                                                                                                | HH:mm:ss               |
| unlink-panels                                                             | 在范围选择器里取消两个日期面板之间的联动                                                                                                                                                                           | ^[boolean]                                                                                                                                                                                                                             | false                                                  |
| single-panel ^(2.14.0) | 在范围选择器中只显示一个面板                                                                                                                                                                                 | ^[boolean]                                                                                                                                                                                                                             | false                                                  |
| disabled-date                                                             | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。应该返回一个 Boolean 值。                                                                                                                                           | ^[Function]`(data: Date) => boolean`                                                                                                                                                                                                   | —                                                      |
| shortcuts                                                                 | 设置快捷选项，需要传入数组对象                                                                                                                                                                                | ^[array]`Array<{ text: string, value: Date \| Function }>`                                                                                                                                                                             | [] |
| cell-class-name                                                           | 设置自定义类名                                                                                                                                                                                        | ^[Function]`(data: Date) => string`                                                                                                                                                                                                    | —                                                      |
| show-footer                                                               | whether to show footer where the date picker is one ^[enum]`'dates' \| 'months' \| 'years' \| 'quarters' \| 'datetime' \| 'datetimerange'` | ^[boolean]                                                                                                                                                                                                                             | false                                                  |
| show-confirm                                                              | 是否显示确定按钮                                                                                                                                                                                       | ^[boolean]                                                                                                                                                                                                                             | false                                                  |
| show-week-number                                                          | 显示周数(除周外)                                                                                                                                                                   | ^[boolean]                                                                                                                                                                                                                             | false                                                  |

### Events

| 名称                                                                 | 详情                       | 类型                                                                                                                                            |
| ------------------------------------------------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| calendar-change                                                    | 在日历所选日期更改时触发仅限“range”类型。 | ^[Function]`(val: [Date, null \| Date]) => void`                                          |
| panel-change                                                       | 当日期面板改变时触发。              | ^[Function]`(date: Date \| [Date, Date], mode: 'month' \| 'year', view?: string) => void` |
| clear ^(2.13.1) | 当点击清除按钮时触发               | ^[Function]`() => void`                                                                   |

### 插槽

| 名称         | 详情       |
| ---------- | -------- |
| default    | 自定义单元格内容 |
| prev-month | 上个月的图标   |
| next-month | 下个月的图标   |
| prev-year  | 上一年图标    |
| next-year  | 下一年图标    |
