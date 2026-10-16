---
title: Timeline 时间线
lang: zh-CN
---

# Timeline 时间线

可视化地呈现时间流信息。

## 基础用法

Timeline 可拆分成多个按照时间戳排列的活动，时间戳是其区分于其他控件的重要特征，使用时注意与 Steps 步骤条等区分。

:::demo

timeline/basic

:::

## Mode ^(2.13.1)

使用 `mode` 来控制时间线与内容的相对位置。

:::tip

在 ^(2.13.1) 之后，`el-timeline` 显式设置了内边距样式。如果您在项目中覆盖了 `ul` 标签的填充样式，请检查以确保布局正确。

:::

:::demo

timeline/mode

:::

## ⾃定义节点样式

可根据实际场景⾃定义节点尺⼨、颜⾊，或直接使⽤图标。

:::demo

timeline/custom-node

:::

## ⾃定义时间戳

当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。

:::demo

timeline/custom-timestamp

:::

## 垂直居中

垂直居中样式的 Timeline-Item

:::demo

timeline/center

:::

## 反向 ^(2.11.9)

使用 reverse 属性来控制节点的顺序。

:::demo

timeline/reverse

:::

## Timeline API

### Timeline Attributes

| 插槽名               | 说明          | 类型                                                                 | 默认值   |
| ----------------- | ----------- | ------------------------------------------------------------------ | ----- |
| reverse ^(2.11.9) | 是否逆序排序      | ^[boolean]                                                         | false |
| mode ^(2.13.1)    | 时间线与内容的相对位置 | ^[enum]`'start' \| 'alternate' \| 'alternate-reverse' \| 'end'` | start |

### Timeline Slots

| 属性名     | 说明                  | 子标签           |
| ------- | ------------------- | ------------- |
| default | timeline 组件的自定义默认内容 | Timeline-Item |

## Timeline-Item API

### Timeline-Item Attributes

| 插槽名            | 说明      | Type                                                                   | Default |
| -------------- | ------- | ---------------------------------------------------------------------- | ------- |
| timestamp      | 时间戳     | ^[string]                                                              | ''      |
| hide-timestamp | 是否隐藏时间戳 | ^[boolean]                                                             | false   |
| center         | 是否垂直居中  | ^[boolean]                                                             | false   |
| placement      | 时间戳位置   | ^[enum]`'top' \| 'bottom'`                                            | bottom  |
| type           | 节点类型    | ^[enum]`'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | ''      |
| color          | 节点颜色    | ^[string]                                                              | ''      |
| size           | 节点尺寸    | ^[enum]`'normal' \| 'large'`                                          | normal  |
| icon           | 自定义图标   | ^[string] / ^[Component]                                               | —       |
| hollow         | 是否空心点   | ^[boolean]                                                             | false   |

### Timeline-Item Slots

| 方法名     | 详情                  |
| ------- | ------------------- |
| default | 自定义 timeline 项的默认内容 |
| dot     | 为时间线项目自定义已定义的节点     |
