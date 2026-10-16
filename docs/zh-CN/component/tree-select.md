---
title: TreeSelect 树形选择
lang: zh-CN
---

# TreeSelect 树形选择

含有下拉菜单的树形选择器，结合了 `el-tree` 和 `el-select` 两个组件的功能。

## 基础用法

树状选择器

:::demo

tree-select/basic

:::

## 选择任意级别

当属性 `check-strictly=true` 时，任何节点都可以被选择，否则只有子节点可被选择。

:::tip

当使用 `show-checkbox`时，由于 `check-on-click-node` 默认值是 false，这时候只能通过 checkbox 来选中，当然您也可以将其设置成 true，这样点击整个 node 都可以用来完成选择

:::

:::demo

tree-select/check-strictly

:::

:::warning

在使用 show-checkbox 时，因为 `check-on-click-leaf` 默认值为 true， 最后一个树节点可以通过点击节点进行勾选。

:::

## 多选

通过点击或复选框选择多个选项。

:::demo

tree-select/multiple

:::

## 禁用选项

使用 disabled 字段禁用选项。

:::demo

tree-select/disabled

:::

## 可筛选

使用关键字筛选或自定义筛选方法。 `filterMethod`可以自定义数据筛选的方法， `filterNodeMethod`可以自定义节点数据筛选的方法。

:::demo

tree-select/filterable

:::

## 自定义内容

自定义树节点的内容。

:::demo

tree-select/slots

:::

## 懒加载

树节点懒加载，更加适合于数据量大的列表。

:::demo

tree-select/lazy

:::

## 使用 node-key 属性

默认情况下，`modelValue` 会查找 `value` 键。对于其他数据结构，必须提供 `node-key` 才能正常工作。

:::tip

1. `node-key` 在整个树中应该是唯一的。
2. `value-key` 与 `node-key` 具有相同的目标。
3. 与 select 组件相反，tree-select 不能检索对象值。

:::

:::demovalue-on-clear

tree-select/node-key

:::

## API

### Attributes

由于这个组件是`el-tree`和`el-select`的结合体，他们的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。

| 属性                                      | 对外暴露的方法                              | 事件                                  | 插槽                                 |
| --------------------------------------- | ------------------------------------ | ----------------------------------- | ---------------------------------- |
| [tree](./tree.md#attributes)            | [tree](./tree.md#exposes)            | [tree](./tree.md#events)            | [tree](./tree.md#slots)            |
| [select](./select.md#select-attributes) | [select](./select.md#select-exposes) | [select](./select.md#select-events) | [select](./select.md#select-slots) |

#### Own Attributes

| 属性名                  | 详情                              | 类型                      | 默认值 |
| -------------------- | ------------------------------- | ----------------------- | --- |
| cache-data ^(2.2.26) | 懒加载节点的缓存数据，结构与数据相同，用于获取未加载数据的标签 | ^[array]`CacheOption[]` | []  |

### 对外暴露的方法

:::warning

在 Tree 和 Select 组件下暴露方法的方式已被 **弃用**，并将于 ^(3.0.0) 中 **移除**，请在各自的组件层级下使用这些方法：`tree` 和 `select`。

:::

| 事件名                                  | 详情                                                        | Type                                                                                                                                                    |
| ------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| treeRef ^(2.11.3)                    | Tree 组件实例                                                 | `TreeInstance`                                                                                                                                          |
| selectRef ^(2.11.3)                  | Select 组件实例                                               | `SelectInstance`                                                                                                                                        |
| filter ^(deprecated)                 | 过滤所有树节点，过滤后的节点将被隐藏                                        | 接收一个参数并指定为 filter-node-method 属性的第一个参数                                                                                                                  |
| updateKeyChildren ^(deprecated)      | 为节点设置新数据，只有当设置 `node-key` 属性的时候才可用                        | (key, data) 接收两个参数: 1. 节点的 key 2. 新数据                                                                                                                   |
| getCheckedNodes ^(deprecated)        | 如果节点可以被选中，(`show-checkbox` 为 `true`), 本方法将返回当前选中节点的数组     | (leafOnly, includeHalfChecked) 接收两个布尔类型参数: 1. 默认值为 `false`. 若参数为 `true`, 它将返回当前选中节点的子节点 2. 默认值为 `false`. 如果参数为 `true`, 返回值包含半选中节点数据                     |
| setCheckedNodes ^(deprecated)        | 设置目前选中的节点，使用此方法必须设置 `node-key` 属性                         | 要选中的节点构成的数组                                                                                                                                             |
| getCheckedKeys ^(deprecated)         | 若节点可用被选中 (`show-checkbox` 为 `true`), 它将返回当前选中节点 key 的数组   | (leafOnly) 接收一个布尔类型参数，默认为 `false`. 若参数为 `true`, 它将返回当前选中节点的子节点                                                                                          |
| setCheckedKeys ^(deprecated)         | 设置目前选中的节点，使用此方法必须设置 `node-key` 属性                         | (keys, leafOnly) 接收两个参数: 1. 一个需要被选中的多节点 key 的数组 2. 布尔类型的值如果设置为 `true`，将只设置选中的叶子节点状态。默认值是 `false`.                                                       |
| setChecked ^(deprecated)             | 设置节点是否被选中, 使用此方法必须设置 `node-key` 属性                        | (key/data, checked, deep) 接收三个参数: 1. 要选中的节点的 key 或者数据 2. 一个布尔类型参数表明是否选中. 3. 一个布尔类型参数，用于指示是否递归选中/取消选中子节点（自 ^(2.14.0) 起，无论 `check-strictly` 设置如何，该行为均有效）。 |
| getHalfCheckedNodes ^(deprecated)    | 如果节点可用被选中 (`show-checkbox` 为 `true`), 它将返回当前半选中的节点组成的数组   | :::                                                                                                                                                     |
| getHalfCheckedKeys ^(deprecated)     | 若节点可被选中(`show-checkbox` 为 `true`)，则返回目前半选中的节点的 key 所组成的数组 | :::                                                                                                                                                     |
| getCurrentKey ^(deprecated)          | 返回当前被选中节点的数据 (如果没有则返回 null)                               | :::                                                                                                                                                     |
| getCurrentNode ^(deprecated)         | 返回当前被选中节点的数据 (如果没有则返回 null)                               | :::                                                                                                                                                     |
| setCurrentKey ^(deprecated)          | 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 `node-key ` 属性             | (key, shouldAutoExpandParent=true) 1. 待被选节点的 key，如果为 `null`, 取消当前选中的节点 2. 是否展开父节点                                                                       |
| setCurrentNode ^(deprecated)         | 设置节点为选中状态，使用此方法必须设置 `node-key `属性                         | (node, shouldAutoExpandParent=true) 1. 待被选中的节点 2. 是否展开父节点                                                                                               |
| getNode ^(deprecated)                | 根据 data 或者 key 拿到 Tree 组件中的 node                          | (data) 节点的 data 或 key                                                                                                                                   |
| remove ^(deprecated)                 | 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性                      | (data) 要删除的节点的 data 或者 node 对象                                                                                                                          |
| append ^(deprecated)                 | 为 Tree 中的一个节点追加一个子节点                                      | (data, parentNode) 1. 要追加的子节点的 data 2. 父节点的 data, key 或 node                                                                                            |
| insertBefore ^(deprecated)           | 在 Tree 中给定节点前插入一个节点                                       | (data, refNode) 1. 要增加的节点的 data 2. 参考节点的 data, key 或 node                                                                                               |
| insertAfter ^(deprecated)            | 在 Tree 中给定节点后插入一个节点                                       | (data, refNode) 1. 要增加的节点的 data 2. 参考节点的 data, key 或 node                                                                                               |
| focus ^(deprecated)                  | 使选择器的输入框获取焦点                                              | ^[Function]`() => void`                                                                                                                              |
| blur ^(deprecated)                   | 使选择器的输入框失去焦点，并隐藏下拉框                                       | ^[Function]`() => void`                                                                                                                              |
| selectedLabel ^(2.8.5) ^(deprecated) | 获取当前选中的标签                                                 | ^[object]`ComputedRef<string \| string[]>`                                                                                                       |

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type CacheOption = {
  value: string | number | boolean | object
  currentLabel: string | number
  isDisabled: boolean
}
```

</details>
