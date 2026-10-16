---
title: Collapse 折叠面板
lang: zh-CN
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

:::demo

collapse/basic

:::

## 手风琴效果

每次只能展开一个面板

:::demo 通过 `accordion` 属性来设置是否以手风琴模式显示。

collapse/accordion

:::

## 自定义面板标题

除了可以通过 `title` 属性以外，还可以通过具名 `slot` 来实现自定义面板的标题内容，以实现增加图标等效果。

:::tip

从版本 ^(2.9.10)开始， `title` 插槽提供一个 `isActive` 属性，显示当前折叠项是否活跃。

:::

:::demo

collapse/customization

:::

## 自定义图标 ^(2.8.3)

除了使用 `icon` 属性外，您还可以自定义面板项目图标，从而添加自定义内容。

:::demo

collapse/custom-icon

:::

## 自定义图标位置 ^(2.9.10)

使用 `expand-icon-position` 属性，您可以自定义图标位置。

:::demo

collapse/custom-icon-position

:::

## 阻止折叠 ^(2.9.11)

设置 `beforeChange` 属性，若返回 false 或者返回 `Promise` 且被 `reject` ，则停止切换。

:::demo

collapse/prevent-collapsing

:::

## Collapse API

### Collapse Attributes

| 属性名                            | 详情                                                      | 类型                                                       | 默认值   |
| ------------------------------ | ------------------------------------------------------- | -------------------------------------------------------- | ----- |
| model-value / v-model          | 当前活动面板，在手风琴模式下其类型是`string`，在其他模式下是`array`               | ^[string] / ^[array]                                     | []    |
| accordion                      | 是否手风琴模式                                                 | ^[boolean]                                               | false |
| expand-icon-position ^(2.9.10) | 设置展开图标位置                                                | ^[enum]`'left' \| 'right'`                              | right |
| before-collapse ^(2.9.11)      | 折叠状态更改之前的折叠钩子。返回 `false` 或者返回 `Promise` 且被 reject 则停止切换 | ^[Function]`() => Promise<boolean> \| boolean` | —     |

### Collapse Events

| 事件名    | 说明                                          | 类型                                                      |
| ------ | ------------------------------------------- | ------------------------------------------------------- |
| change | 切换当前活动面板，在手风琴模式下其类型是`string`，在其他模式下是`array` | ^[Function]`(activeNames: array \| string) => void` |

### Collapse Slots

| 插槽名     | Description | 子标签           |
| ------- | ----------- | ------------- |
| default | 自定义默认内容     | Collapse Item |

### Collapse Exposes

| 方法名            | 说明        | 类型                                                           |
| -------------- | --------- | ------------------------------------------------------------ |
| activeNames    | 当前活动的面板名称 | ^[object]`ComputedRef<(string \| number)[]>`          |
| setActiveNames | 设置活动面板名称  | ^[Function]`(activeNames: (string \| number)[]) => void` |

## Collapse Item API

### Collapse Item Attributes

| 属性名           | 说明      | Type                     | 默认值        |
| ------------- | ------- | ------------------------ | ---------- |
| name          | 唯一标志符   | ^[string] / ^[number]    | —          |
| title         | 面板标题    | ^[string]                | ''         |
| icon ^(2.8.3) | 折叠项目的图标 | ^[string] / ^[Component] | ArrowRight |
| disabled      | 是否禁用    | ^[boolean]               | false      |

### Collapse Item Slot

| Name          | Description       | Type                             |
| ------------- | ----------------- | -------------------------------- |
| default       | Collapse Item 的内容 | —                                |
| title         | Collapse Item 的标题 | ^[object]`{ isActive: boolean }` |
| icon ^(2.8.3) | 折叠项目图标的内容         | ^[object]`{ isActive: boolean }` |

### Collapse Item Exposes

| Name     | Description | Type                                                |
| -------- | ----------- | --------------------------------------------------- |
| isActive | 当前折叠项是否激活   | ^[object]`ComputedRef<boolean \| undefined>` |
