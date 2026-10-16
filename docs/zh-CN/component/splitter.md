---
title: Splitter 分隔面板
lang: zh-CN
---

# Splitter 分隔面板 ^(beta)

可将区域水平或垂直分隔，并可自由拖动以调整各个区域的大小。

## 基础用法

最基本的用法，如果未传入默认尺寸，将自动平均分配。

:::demo

splitter/basic

:::

## 垂直布局

使用垂直方向。

:::demo

splitter/vertical

:::

## 可折叠

配置 `collapsible` 可提供快速收缩功能。你可以使用 `min` 属性来防止折叠后通过拖拽进行扩展。

:::demo

splitter/collapsible

:::

## 禁用拖动

当任一面板禁用 `resizable` 时，拖拽功能将被禁用。

:::demo

splitter/disableDrag

:::

## 面板大小

`v-model:size` 可以获取面板的大小。

:::demo

splitter/size

:::

## 延迟^(2.11.0)

当启用`lazy`时，面板大小将不会在拖动时实时更新，只能在拖动结束后更新。

:::demo

splitter/lazy

:::

## Splitter API

### Splitter Attributes

| 名称                                                                | 详情        | 类型                                                                                      | 默认值        |
| ----------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------- | ---------- |
| layout                                                            | 分隔面板的布局方向 | ^[enum]`'horizontal' \| 'vertical'` | horizontal |
| lazy ^(2.11.0) | 是否使用懒加载   | ^[boolean]                          | false      |

### Splitter Events

| 名称                                                                    | 详情                           | 类型                                                                                                                                |
| --------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| resize-start                                                          | 开始调整面板大小时触发，`index` 是拖拽条的索引。 | ^[Function]`(index: number, sizes: number[]) => void`                         |
| resize                                                                | 调整面板大小时触发，`index` 是拖拽条的索引。   | ^[Function]`(index: number, sizes: number[]) => void`                         |
| resize-end                                                            | 面板调整大小结束时触发，`index` 是拖拽条的索引。 | ^[Function]`(index: number, sizes: number[]) => void`                         |
| collapse ^(2.10.3) | 当面板折叠时触发，`index` 是拖拽条的索引。    | ^[Function]`(index: number, type: 'start' \| 'end', sizes: number[]) => void` |

## SplitterPanel API

### SplitterPanel Attributes

| 名称                                  | 描述                                 | 类型                                                                                                                            | 默认值   |
| ----------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----- |
| size / v-model:size | 面板大小(像素或百分比)    | ^[string] / ^[number] | -     |
| min                                 | 面板最小尺寸(像素或百分比)  | ^[string] / ^[number] | -     |
| max                                 | 面板的最大尺寸(像素或百分比) | ^[string] / ^[number] | -     |
| resizable                           | 是否可以调整面板大小                         | ^[boolean]                                                                | true  |
| collapsible                         | 面板是否可折叠。                           | ^[boolean]                                                                | false |

### SplitterPanel Events

| 方法名                         | 说明         | 类型                                                                                      |
| --------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| update:size | 当面板大小改变时触发 | ^[Function]`(size: number) => void` |

### SplitterPanel Slots

| 插槽名               | 详情            |
| ----------------- | ------------- |
| default           | 面板的默认内容       |
| start-collapsible | 自定义起始折叠按钮的内容  |
| end-collapsible   | 结束可折叠按钮的自定义内容 |

### SplitterPanel Exposes

| 方法名                                                                           | 说明                    | 类型                                                                                 |
| ----------------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------- |
| splitterPanelRef ^(2.11.9) | SplitterPanel html 元素 | ^[object]`Ref<HTMLDivElement>` |
