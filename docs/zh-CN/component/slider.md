---
title: Slider 滑块
lang: zh-CN
---

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

在拖动滑块时，显示当前值

:::demo 通过设置绑定值自定义滑块的初始值

slider/basic-usage

:::

## 离散值

选项可以是离散的

:::demo 改变`step`的值可以改变步长，通过设置 `show-stops` 属性可以显示间断点

slider/discrete-values

:::

## 带有输入框的滑块

通过输入框输入来改变当前的值。

:::demo 设置 `show-input` 属性会在右侧显示一个输入框

slider/slider-with-input-box

:::

## 不同尺寸

:::demo

slider/sizes

:::

## 位置

您可以自定义 Tooltip 提示的位置。

:::demo

slider/placement

:::

## 范围选择

你还可以选择一个范围值

:::demo 配置 `range` 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

slider/range-selection

:::

## 垂直模式

:::demo 配置 `vertical` 属性为 `true` 启用垂直模式。在垂直模式下，必须设置 `height` 属性。

slider/vertical-mode

:::

## 显示标记

:::demo 设置 `marks` 属性可以在滑块上显示标记。

slider/show-marks

:::

## 限制值 ^(2.13.6)

:::demo 设置 `step="mark"` 以将滑块值限制为刻度。

slider/restrict-value

:::

## API

### 属性

| 属性名                         | 描述                                                                                                                        | 类型                                                                                                                                                                                     | 默认      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| model-value / v-model       | 选中项绑定值                                                                                                                    | ^[number] / ^[array]`number[]`                                                                                                                                                         | 0       |
| min                         | 最小值                                                                                                                       | ^[number]                                                                                                                                                                              | 0       |
| max                         | 最大值                                                                                                                       | ^[number]                                                                                                                                                                              | 100     |
| disabled                    | 是否禁用                                                                                                                      | ^[boolean]                                                                                                                                                                             | false   |
| step                        | 步长，可以是数字或 `'mark'` ^(2.13.6)，用于将值限制为刻度。 当设置为 `'mark'` 时，必须设置 `marks` 属性。                                                  | ^[number] / ^[string]`'mark'`                                                                                                                                                          | 1       |
| show-input                  | 是否显示输入框，仅在 `range` 为 false 且 `step` 不为 `'mark'` 时生效。                                                                      | ^[boolean]                                                                                                                                                                             | false   |
| show-input-controls         | 在显示输入框的情况下，是否显示输入框的控制按钮                                                                                                   | ^[boolean]                                                                                                                                                                             | true    |
| size                        | slider 包装器的大小，垂直模式下该属性不可用                                                                                                 | ^[enum]`'' \| 'large' \| 'default' \| 'small'`                                                                                                                                      | default |
| input-size                  | 输入框的大小，如果设置了 `size` 属性，默认值自动取 `size`                                                                                      | ^[enum]`'' \| 'large' \| 'default' \| 'small'`                                                                                                                                      | default |
| show-stops                  | 是否显示间断点                                                                                                                   | ^[boolean]                                                                                                                                                                             | false   |
| show-tooltip                | 是否显示提示信息                                                                                                                  | ^[boolean]                                                                                                                                                                             | true    |
| format-tooltip              | 格式化提示信息                                                                                                                   | ^[Function]`(value: number) => number \| string`                                                                                                                                   | —       |
| range                       | 是否开启选择范围                                                                                                                  | ^[boolean]                                                                                                                                                                             | false   |
| vertical                    | 垂直模式                                                                                                                      | ^[boolean]                                                                                                                                                                             | false   |
| height                      | 滑块高度，垂直模式必填                                                                                                               | ^[string]                                                                                                                                                                              | —       |
| aria-label ^(a11y) ^(2.7.2) | 原生 `aria-label`属性                                                                                                         | ^[string]                                                                                                                                                                              | —       |
| range-start-label           | 当 `range` 为true时，屏幕阅读器标签开始的标记                                                                                             | ^[string]                                                                                                                                                                              | —       |
| range-end-label             | 当 `range` 为true时，屏幕阅读器标签结尾的标记                                                                                             | ^[string]                                                                                                                                                                              | —       |
| format-value-text           | 显示屏幕阅读器的 `aria-valuenow` 属性的格式                                                                                            | ^[Function]`(value: number) => string`                                                                                                                                              | —       |
| tooltip-class               | tooltip 的自定义类名                                                                                                            | ^[string]                                                                                                                                                                              | —       |
| placement                   | Tooltip 出现的位置                                                                                                             | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | top     |
| marks                       | 标记， key 的类型必须为 `number` 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式                                                               | ^[object]`SliderMarks`                                                                                                                                                                 | —       |
| validate-event              | 输入时是否触发表单的校验                                                                                                              | ^[boolean]                                                                                                                                                                             | true    |
| persistent ^(2.9.5)         | 当 slider 的 tooltip 处于非活动状态且 `persistent` 为 `false` 时，tooltip 将被销毁。当 `show-tooltip` 为 `false` 时，`persistent` 将始终为 `false`。 | ^[boolean]                                                                                                                                                                             | true    |
| label ^(a11y) ^(deprecated) | 原生 `aria-label`属性                                                                                                         | ^[string]                                                                                                                                                                              | —       |

### 事件

| 事件名    | 说明                        | 类型                                                       |
| ------ | ------------------------- | -------------------------------------------------------- |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | ^[Function]`(value: Arrayable<number>) => void` |
| input  | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | ^[Function]`(value: Arrayable<number>) => void` |

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type SliderMarks = Record<number, string | { style: CSSProperties; label: any }>
type Arrayable<T> = T | T[]
```

</details>
