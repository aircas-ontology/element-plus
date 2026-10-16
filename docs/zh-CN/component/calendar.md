---
title: Calendar 日历
lang: zh-CN
---

# Calendar 日历

显示日期

## 基础用法

:::demo 设置 `value` 来指定当前显示的月份。如果 `value` 未指定，则显示当月。 `value` 支持 `v-model` 双向绑定。

calendar/basic

:::

## 控制器类型 ^(2.13.1)

:::demo 您可以设置日历头部的控制器类型。设置 `select`时，您可以使用 `formatter` 自定义 `label`。

calendar/controller-type

:::

## 自定义内容

:::demo 通过设置名为 `date-cell` 的 `scoped-slot` 来自定义日历单元格中显示的内容。在 `scoped-slot` 可以获取到 date（当前单元格的日期）, data（包括 type，isSelected，day 属性）。详情解释参考下方的 API 文档。

calendar/customize

:::

## 范围

:::demo 设置 `range` 属性指定日历的显示范围。开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。

calendar/range

:::

## 自定义日历头部

:::demo

calendar/header

:::

## 国际化

由于 Element Plus 的默认语言为英语，如果你需要设置其它的语言，请参考[国际化](/zh-CN/guide/i18n)文档。

要注意的是：日期相关的文字（月份，每一周的第一天等等）也都是通过国际化来配置的。

## API

### Attributes

| 属性名                       | 说明                                                     | 类型                                                                             | 默认值    |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------ | ------ |
| model-value / v-model     | 选中项绑定值                                                 | ^[Date]                                                                        | —      |
| range                     | 时间范围，包括开始时间与结束时间。开始时间必须是周起始日，结束时间必须是周结束日，且时间跨度不能超过两个月。 | ^[array]`[Date, Date]`                                                         | —      |
| controller-type ^(2.13.1) | 日历头部的控制器类型                                             | ^[enum]`'button' \| 'select'`                                                 | button |
| formatter ^(2.13.1)       | 当 `controller-type` 为“select”时的格式标签                    | ^[Function]`(value: number, type: 'year' \| 'month') => string \| number` | —      |

### Slots

| 插槽名       | 说明                                                                                                                                 | 类型                                                                                                                             |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| date-cell | `type` 表示该日期的所属月份，可选值有 prev-month、current-month 和 next-month；`isSelected` 标明该日期是否被选中；`day` 是格式化的日期，格式为 `yyyy-MM-dd`；`date` 是单元格的日期 | ^[object]`{ data: { type: 'prev-month' \| 'current-month' \| 'next-month', isSelected: boolean, day: string, date: Date } }` |
| header    | 卡片标题内容                                                                                                                             | ^[object]`{ date: string }`                                                                                                    |

### Exposes

| 名称                          | 说明                | 类型                                                                                               |
| --------------------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| selectedDay                 | 当前已选日期            | ^[object]`ComputedRef<Dayjs \| undefined>`                                                |
| pickDay                     | 选择一个具体日期          | ^[Function]`(day: dayjs.Dayjs) => void`                                                       |
| selectDate                  | 选择日期              | ^[Function]`(type: CalendarDateType) => void`                                                 |
| calculateValidatedDateRange | 根据开始与结束日期计算验证日期范围 | ^[Function]`(startDayjs: dayjs.Dayjs, endDayjs: dayjs.Dayjs) => [dayjs.Dayjs, dayjs.Dayjs][]` |

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type CalendarDateType =
  'prev-month' | 'next-month' | 'prev-year' | 'next-year' | 'today'
```

</details>
