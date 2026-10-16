---
title: ColorPickerPanel 颜色选择器面板
lang: zh-CN
---

# ColorPickerPanel 颜色选择器面板 ^(beta)

`ColorPickerPanel`是`ColorPicker`的核心组件。

## 基础用法

:::demo ColorPickerPanel 需要一个字符串类型的变量才能绑定到 v-model。

color-picker-panel/basic

:::

## 选择透明度

:::demo ColorPickerPanel 支持Alpha 通道选择。要激活 Alpha 选择，只需添加 "show-alpha" 属性。

color-picker-panel/alpha

:::

## 预定义颜色

:::demo 颜色选择板支持预定义的颜色选项

color-picker-panel/predefined-color

:::

## Border 边框

默认情况下，边框是默认的，如果你不想要边框请参考示例。

:::demo

color-picker-panel/border

:::

## 禁用

"禁用"属性决定颜色选择器是否完全禁用。

:::demo

color-picker-panel/disabled

:::

## API

### 属性

| 方法名                                                                           | 详情                 | 事件参数                                                                                                                                                      | 默认值                                                                                                                              |
| ----------------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| model-value / v-model                                                         | 绑定值                | ^[string]                                                                                             | —                                                                                                                                |
| border                                                                        | 颜色选择器面板是否有边框       | ^[boolean]                                                                                            | true                                                                                                                             |
| disabled                                                                      | 是否禁用               | ^[boolean]                                                                                            | false                                                                                                                            |
| show-alpha                                                                    | 是否显示 alpha 滑块      | ^[boolean]                                                                                            | false                                                                                                                            |
| color-format                                                                  | 写入 v-model 的颜色的格式  | ^[enum]`'rgb' \| 'prgb' \| 'hex' \| 'hex3' \| 'hex4' \| 'hex6' \| 'hex8' \| 'name' \| 'hsl' \| 'hsv'` | ^[enum]`'hex' (when show-alpha is false) \| 'rgb' (when show-alpha is true)` |
| predefine                                                                     | 预定义颜色              | ^[array]`string[]`                                                                                    | —                                                                                                                                |
| validate-event ^(2.11.7)   | 是否触发表单验证           | ^[boolean]                                                                                            | true                                                                                                                             |
| hue-slider-class ^(2.13.6) | 类名将会传递给 hue-slider | ^[object]`string \| string[] \| Record<string, boolean>`                                              | :::                                                                              |
| hue-slider-style ^(2.13.6) | 样式将会传递给 hue-slider | ^[string] / ^[object]`StyleValue`                 | :::                                                                              |

### 插槽

| 方法名    | 详情          |
| ------ | ----------- |
| footer | 输入框之后要附加的内容 |

### 对外暴露的方法

| 方法名                                                                 | 详情            | 事件参数                                                                         |
| ------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------- |
| color                                                               | 当前色彩对象        | ^[object]`Color`         |
| inputRef                                                            | 自定义 input ref | ^[object]`InputInstance` |
| update ^(2.11.4) | 更新子组件         | ^[Function]`() => void`  |
