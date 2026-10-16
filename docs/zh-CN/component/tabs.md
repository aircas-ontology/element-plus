---
title: Tabs 标签页
lang: zh-CN
---

# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

基础的、简洁的标签页。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

tabs/basic

:::

## 卡片风格的标签

你可以设置具有卡片风格的标签。

:::demo 只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

tabs/card-style

:::

## 带有边框的卡片风格

你还可以设置标签页为带有边框的卡片

:::demo 将 `type` 设置为 `border-card`。

tabs/border-card

:::

## 标签位置的设置

可以通过 `tab-position` 设置标签的位置

:::demo 标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`

tabs/tab-position

:::

## 自定义标签页的内容

可以通过具名插槽来实现自定义标签页的内容

:::demo

tabs/custom-tab

:::

## 动态增减标签页

增减标签页按钮只能在选项卡样式的标签页下使用

:::demo

tabs/dynamic-tabs

:::

## 添加按钮自定义图标 ^(2.4.0)

:::demo

tabs/customized-add-button-icon

:::

## 增加标签页触发器自定义

:::demo

tabs/customized-trigger

:::

## 默认值^(2.11.9)

:::demo

tabs/default-value

:::

## Tabs API

### Tabs Attributes

| 属性名                     | 说明                                                         | 类型                                                                                                         | Default    |
| ----------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------- |
| model-value / v-model   | 绑定值，选中选项卡的 name，默认值是第一个 tab 的 name                         | ^[string] / ^[number]                                                                                      | —          |
| default-value ^(2.11.9) | 在初始渲染时处于激活状态的标签的值。（避免初始化时变动）                               | ^[string] / ^[number]                                                                                      |            |
| type                    | 风格类型                                                       | ^[enum]`'' \| 'card' \| 'border-card'`                                                                   | ''         |
| closable                | 标签是否可关闭                                                    | ^[boolean]                                                                                                 | false      |
| addable                 | 标签是否可增加                                                    | ^[boolean]                                                                                                 | false      |
| editable                | 标签是否同时可增加和关闭                                               | ^[boolean]                                                                                                 | false      |
| tab-position            | 选项卡所在位置                                                    | ^[enum]`'top' \| 'right' \| 'bottom' \| 'left'`                                                         | top        |
| stretch                 | 标签的宽度是否自撑开                                                 | ^[boolean]                                                                                                 | false      |
| before-leave            | 切换标签之前的钩子函数，若返回 `false ` 或者返回被 reject 的 ` Promise `，则阻止切换。 | ^[Function]`(activeName: TabPaneName, oldActiveName: TabPaneName) => Awaitable<void \| boolean>` | () => true |
| tabindex ^(2.11.7)      | tabs 的 tabindex                                            | ^[string] / ^[number]                                                                                      | 0          |

### Tabs Events

| 事件名        | 说明                 | 回调参数                                                                                      |
| ---------- | ------------------ | ----------------------------------------------------------------------------------------- |
| tab-click  | tab 被选中时触发         | ^[Function]`(pane: TabsPaneContext, ev: Event) => void`                                |
| tab-change | `activeName` 改变时触发 | ^[Function]`(name: TabPaneName) => void`                                               |
| tab-remove | 点击 tab 移除按钮时触发     | ^[Function]`(name: TabPaneName) => void`                                               |
| tab-add    | 点击 tab 新增按钮时触发     | ^[Function]`() => void`                                                                |
| edit       | 点击 tab 的新增或移除按钮后触发 | ^[Function]`(paneName: TabPaneName \| undefined, action: 'remove' \| 'add') => void` |

### Tabs Slots

| 插槽名                            | 说明        | 子标签      |
| ------------------------------ | --------- | -------- |
| default                        | 默认插槽      | Tab-pane |
| add-icon ^(2.5.4)              | 自定义添加按钮图标 | —        |
| addIcon ^(2.4.0) ^(deprecated) | 自定义添加按钮图标 | —        |

### Tabs Exposes

| 方法名                 | 说明           | 类型                                                 |
| ------------------- | ------------ | -------------------------------------------------- |
| currentName         | 当前活动的面板名称    | ^[object]`Ref<TabPaneName>`                  |
| tabNavRef ^(2.9.10) | tab-nav 组件实例 | ^[object]`Ref<TabNavInstance \| undefined>` |

## Tab-nav API

### Tab-nav Exposes

| 方法名                  | 说明                           | 类型                                                 |
| -------------------- | ---------------------------- | -------------------------------------------------- |
| scrollToActiveTab    | 滚动到活动标签                      | ^[Function]`() => Promise<void>`          |
| removeFocus          | 移除聚焦状态                       | ^[Function]`() => boolean`                      |
| tabListRef ^(2.9.10) | el_tabs\_\_nav html 元素 | ^[object]`Ref<HTMLDivElement \| undefined>` |
| tabBarRef ^(2.9.10)  | el_tabs\_\_nav bar 实例  | ^[object]`Ref<TabBarInstance \| undefined>` |

## Tab-bar API

### Tab-bar Exposes

| 属性名              | 详情                    | 类型                                                 |
| ---------------- | --------------------- | -------------------------------------------------- |
| ref ^(2.9.10)    | 选项卡根 HTML 元素          | ^[object]`Ref<HTMLDivElement \| undefined>` |
| update ^(2.9.10) | 手动更新标签栏样式的方法，返回更新后的样式 | ^[Function]`() => CSSProperties`                |

## Tab-pane API

### Tab-pane Attributes

| 名称       | 详情                                                      | Type                  | 默认值   |
| -------- | ------------------------------------------------------- | --------------------- | ----- |
| label    | 选项卡标题                                                   | ^[string]             | ''    |
| disabled | 是否禁用                                                    | ^[boolean]            | false |
| name     | 与选项卡绑定值 value 对应的标识符，表示选项卡别名。默认值是tab面板的序列号，如第一个 tab 是 0 | ^[string] / ^[number] | —     |
| closable | 标签是否可关闭                                                 | ^[boolean]            | false |
| lazy     | 标签是否延迟渲染                                                | ^[boolean]            | false |

### Tab-pane Slots

| Name    | Description    |
| ------- | -------------- |
| default | Tab-pane 的内容   |
| label   | Tab-pane 的标题内容 |

## 常见问题

#### 如何使用可排序/可拖动的 tabs？

我们已对外暴露了实现该功能所需的必要能力。您可以查看 [示例](https://tinyurl.com/2jkyw82j) 来用原生的方式实现。或使用 [SortableJs](https://github.com/SortableJS/Sortable), [示例](https://tinyurl.com/2r8js24y)。
