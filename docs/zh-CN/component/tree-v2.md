---
title: Tree V2 虚拟化树形控件
lang: zh-CN
---

# <ElBadge value="beta">Tree V2 虚拟化树形控件</ElBadge>

不论你的数据量多大，虚拟树都能毫无压力地处理。

## 基础用法

基础的树形结构展示

:::demo

tree-v2/basic

:::

## 可选择的虚拟树

适用于需要选择层级时使用。

:::demo

tree-v2/selectable

:::

:::warning

在使用 show-checkbox 时，因为 `check-on-click-leaf` 默认值为 true， 最后一个树节点可以通过点击节点进行勾选。

:::

## 禁用复选框

节点的复选框可以设置为禁用。

:::demo 在示例中，属性在 defaultProps 中声明了 `disabled`，一些节点被设置为 `disabled：true`。相应的复选框已禁用，不能点击。

tree-v2/disabled

:::

## 默认扩展和默认检查

树节点可以在初始化阶段被设置为展开或选中。

:::demo 分别通过 `default-expanded-keys` 和 `default-checked-keys` 设置默认展开和默认选中的节点。

tree-v2/default-state

:::

## 自定义节点内容

节点的内容支持自定义，可以在节点区添加按钮或图标等内容

:::demo

tree-v2/custom-node

:::

## 自定义节点类 ^(2.9.0)

节点的类名支持自定义。

:::demo

tree-v2/custom-node-class

:::

## 自定义图标 ^(2.10.3)

您可以自定义不同节点状态的图标。树节点暴露了 `expanded` 属性和 `isLeaf` 属性，允许你根据节点的状态动态渲染不同的图标：叶子节点、展开的节点或折叠的节点。

:::demo

tree-v2/custom-icon

:::

## 树节点过滤 ^(2.9.1)

`filter-method` 方法只有在版本 `2.9.1` 之后才能接受第三个参数。树节点是可以被过滤的

:::demo 在需要对节点进行过滤时，调用 Tree 实例的 `filter` 方法，参数为关键字。需要注意的是，此时需要设置 `filter-method`，值为过滤函数。

tree-v2/filter

:::

## TreeV2 API

### TreeV2 Attributes

| 属性名                           | 说明                                                            | 类型                                                                             | 默认值   |
| ----------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----- |
| data                          | 展示数据                                                          | ^[array]`Array<{[key: string]: any}>`                                    | —     |
| empty-text                    | 内容为空的时候展示的文本                                                  | ^[string]                                                                      | —     |
| [props](#props)               | 配置选项，具体看下表                                                    | ^[object]                                                                      | —     |
| highlight-current             | 是否高亮当前选中节点                                                    | ^[boolean]                                                                     | false |
| expand-on-click-node          | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点 | ^[boolean]                                                                     | true  |
| check-on-click-node           | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点                    | ^[boolean]                                                                     | false |
| check-on-click-leaf ^(2.9.6)  | 点击叶节点(最后一个子节点)时是否检查或取消节点                                      | ^[boolean]                                                                     | true  |
| default-expanded-keys         | 默认展开的节点的 key 的数组                                              | ^[array]`Array<string \| number>`                                       | —     |
| show-checkbox                 | 节点是否可被选择                                                      | ^[boolean]                                                                     | false |
| check-strictly                | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false                        | ^[boolean]                                                                     | false |
| default-checked-keys          | 默认勾选的节点的 key 的数组                                              | ^[array]`Array<string \| number>`                                       | —     |
| current-node-key              | 当前选中的节点                                                       | ^[string] / ^[number]                                                          | —     |
| filter-method                 | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 `false` 则表示这个节点会被隐藏      | ^[Function]`(query: string, data: TreeNodeData, node: TreeNode) => boolean` | —     |
| indent                        | 相邻级节点间的水平缩进，单位为像素                                             | ^[number]                                                                      | 16    |
| icon                          | 自定义树节点图标组件                                                    | ^[string] / ^[Component]                                                       | —     |
| item-size ^(2.2.33)           | 自定义树节点的高度                                                     | ^[number]                                                                      | 26    |
| scrollbar-always-on ^(2.10.4) | 总是显示滚动条                                                       | ^[boolean]                                                                     | false |
| height                        | tree 的高度                                                      | ^[number]                                                                      | 200   |

### props

| 属性             | 说明                           | 类型                                                                                                      | 默认值      |
| -------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- | -------- |
| value          | 每个树节点用来作为唯一标识的属性，在整棵树中应该是唯一的 | ^[string]                                                                                               | id       |
| label          | 指定节点标签为节点对象的某个属性值            | ^[string]                                                                                               | label    |
| children       | 指定子树为节点对象的某个属性值              | ^[string]                                                                                               | children |
| disabled       | 指定节点选择框是否禁用为节点对象的某个属性值       | ^[string]                                                                                               | disabled |
| class ^(2.9.0) | 自定义节点类名                      | ^[string] / ^[Function]`(data: TreeNodeData, node: TreeNode) => string \| {[key: string]: boolean}` | —        |

### TreeV2 Exposes

`Tree` 组件有以下方法，均返回当前选中的节点数组

| 方法                    | 说明                                                        | 参数                                                                       |
| --------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------ |
| filter                | 过滤所有树节点，过滤后的节点将被隐藏                                        | `(query: string)`                                                        |
| getCheckedNodes       | 如果节点可以被选中，(`show-checkbox` 为 `true`), 本方法将返回当前选中节点的数组     | `(leafOnly: boolean)`                                                    |
| getCheckedKeys        | 若节点可用被选中 (`show-checkbox` 为 `true`), 它将返回当前选中节点 key 的数组   | `(leafOnly: boolean)`                                                    |
| setCheckedKeys        | 通过 keys 设置目前勾选的节点                                         | `(keys: TreeKey[])`                                                      |
| setChecked            | 设置节点是否被选中，`deep`（^(2.14.0) 新增）表示是否递归选中/取消选中子节点。           | `(key: TreeKey, checked: boolean, deep?: boolean)`                       |
| setExpandedKeys       | 设置当前展开的节点                                                 | `(keys: TreeKey[])`                                                      |
| getHalfCheckedNodes   | 如果节点可用被选中 (`show-checkbox` 为 `true`), 它将返回当前半选中的节点组成的数组   | —                                                                        |
| getHalfCheckedKeys    | 若节点可被选中(`show-checkbox` 为 `true`)，则返回目前半选中的节点的 key 所组成的数组 | —                                                                        |
| getCurrentKey         | 获取当前被选中节点的 key，若没有节点被选中则返回 `undefined`                    | —                                                                        |
| getCurrentNode        | 获取当前被选中节点的 data，若没有节点被选中则返回 `undefined`                   | —                                                                        |
| setCurrentKey         | 通过 key 设置某个节点的当前选中状态                                      | `(key: TreeKey)`                                                         |
| getNode               | 通过 key 或 data 获取节点                                        | `(data: TreeKey \| TreeNodeData)`                                       |
| expandNode            | 展开指定节点                                                    | `(node: TreeNode)`                                                       |
| collapseNode          | 折叠指定节点                                                    | `(node: TreeNode)`                                                       |
| setData               | 当数据量非常庞大的时候，总是使用响应式数据将导致性能表现不佳，所以我们提供一种显式设置的方式来避免此种情况     | `(data: TreeData)`                                                       |
| scrollTo ^(2.8.0)     | 滚动到给定位置                                                   | `(offset: number)`                                                       |
| scrollToNode ^(2.8.0) | 使用给定的滚动策略滚动至指定位置                                          | `(key: TreeKey, strategy?: auto \| smart \| center \| start \| end)` |

### TreeV2 Events

| 名称                 | 说明                  | 类型                                                                                                                                      |
| ------------------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| node-click         | 当节点被点击的时候触发         | `(data: TreeNodeData, node: TreeNode, e: MouseEvent)`                                                                                   |
| node-drop ^(2.8.3) | 拖放到节点时触发器           | `(data: TreeNodeData, node: TreeNode, e: DragEvent)`                                                                                    |
| node-contextmenu   | 当某一节点被鼠标右键点击时会触发该事件 | `(e: Event, data: TreeNodeData, node: TreeNode)`                                                                                        |
| check-change       | 当复选框被点击的时候触发        | `(data: TreeNodeData, checked: boolean)`                                                                                                |
| check              | 点击节点复选框之后触发         | `(data: TreeNodeData, info: { checkedKeys: TreeKey[],checkedNodes: TreeData, halfCheckedKeys: TreeKey[], halfCheckedNodes: TreeData,})` |
| current-change     | 当前选中节点变化时触发的事件      | `(data: TreeNodeData, node: TreeNode)`                                                                                                  |
| node-expand        | 节点被展开时触发的事件         | `(data: TreeNodeData, node: TreeNode)`                                                                                                  |
| node-collapse      | 节点被关闭时触发的事件         | `(data: TreeNodeData, node: TreeNode)`                                                                                                  |

### TreeV2 Slots

| 插槽名            | 描述           | Type                                              |
| -------------- | ------------ | ------------------------------------------------- |
| default        | 自定义树节点的内容。   | ^[object]`{ node: TreeNode, data: TreeNodeData }` |
| empty ^(2.9.0) | 当数据为空时自定义的内容 | —                                                 |

## 类型声明

<details>
  <summary>Show declarations</summary>

```ts
type TreeNodeData = Record<string, any>
type TreeKey = string | number
type TreeData = TreeNodeData[]

interface TreeNode {
  key: TreeKey
  level: number
  parent?: TreeNode
  children?: TreeNode[]
  data: TreeNodeData
  disabled?: boolean
  label?: string
  isLeaf?: boolean
  expanded?: boolean
  isEffectivelyChecked?: boolean
}
```

</details>
