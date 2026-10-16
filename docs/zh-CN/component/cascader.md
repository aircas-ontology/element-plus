---
title: Cascader 级联选择器
lang: zh-CN
---

# Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

## 基础用法

有两种触发子菜单的方式

:::demo 只需为 Cascader 的`options`属性指定选项数组即可渲染出一个级联选择器。通过 `props.expandTrigger` 属性控制子节点的展开方式

cascader/basic

:::

## 有禁用选项

通过在数据源中设置 `disabled` 字段来声明该选项是禁用的

:::demo 本例中，`options`指定的数组中的第一个元素含有`disabled: true`键值对，因此是禁用的。在默认情况下，Cascader 会检查数据中每一项的`disabled`字段是否为`true`，如果你的数据中表示禁用含义的字段名不为`disabled`，可以通过`props.disabled`属性来指定（详见下方 API 表格）。当然，`value`、`label`和`children`这三个字段名也可以通过同样的方式指定。

cascader/option-disabling

:::

## 可清空

通过 `clearable` 设置输入框可清空

:::demo

cascader/clearable

:::

## 自定义清除图标^(2.11.0)

你可以通过`clear-icon`属性自定义清除图标

:::demo

cascader/clear-icon

:::

## 仅显示最后一级

可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。

:::demo 属性`show-all-levels`定义了是否显示完整的路径，将其赋值为 `false` 则仅显示最后一级。

cascader/last-level

:::

## 多选

在标签中添加 `:props="props"` 并设置 `props = { multiple: true }` 来开启多选模式。

正确用法：

```vue
<template>
  <el-cascader :props="props" />
</template>

<script lang="ts" setup>
const props = { multiple: true }
</script>
```

错误用法：

```vue
<template>
  <!--  Object literal binding here is invalid syntax for cascader  -->
  <el-cascader :props="{ multiple: true }" />
</template>
```

:::demo 使用多选时，所有选中的标签将默认显示。您可以设置 `collapse = true` 将选中的标签折叠。您可以设置 `max-collapse-tags` 来显示最大tag数量，默认1。您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

cascader/multiple-selection

:::

## 选择任意一级选项

在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。启用该功能后，可让父子节点取消关联，选择任意一级选项。

:::demo 可通过 `props.checkStrictly = true` 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。

cascader/any-level

:::

## 动态加载

当选中某一级时，动态加载该级下的选项。

:::demo 通过`lazy`开启动态加载，并通过`lazyload`来设置加载数据源的方法。 `lazyload`方法有两个参数，第一个参数`node`为当前点击的节点，第二个`resolve`为数据加载完成的回调(必须调用)。为了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位 (默认字段为`leaf`，可通过`props.leaf`修改)。否则，将以有无子节点来判断其是否为叶子节点。

cascader/dynamic-loading

:::

## 可搜索

可以快捷地搜索选项并选择。

:::demo 通过添加`filterable`来启用过滤。 Cascader 会匹配所有节点的标签和它们的亲节点的标签，是否包含有输入的关键字。你也可以用`filter-method`自定义搜索逻辑，接受一个函数，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中。

cascader/filterable

:::

## 自定义节点内容

可以自定义备选项的节点内容

:::demo 你可以通过 `scoped slot` 自定义节点的内容。您可以访问 scope 中的 `node` 和 `data` 属性，分别表示当前节点的 Node 对象和当前节点的数据。

cascader/custom-content

:::

## 自定义建议项^(2.9.5)

你可以通过 `suggestion-item` 插槽自定义建议项。你可以在作用域中访问 `item`，它代表建议项。

:::demo

cascader/custom-suggestion-item

:::

## 级联面板

级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。

:::demo 和级联选择器一样，通过 `options` 来指定选项，也可通过 `props` 来设置多选、动态加载等功能，具体详情见下方API表格。

cascader/panel

:::

## 自定义标签 ^(2.10.3)

您可以自定义标签。

:::demo 将自定义的标签插入 `el-cascader` 的 slot 中即可。 `collapse-tags`, `collapse-tags-tooltip`, `max-collapse-tags` 在此模式下不生效.

cascader/custom-tag

:::

## 已勾选项显示策略 ^(2.10.5)

控制在多选模式下已选值的显示方式。

:::demo 在多选模式下，你可以使用 `show-checked-strategy` 来控制已选值的显示方式。默认策略为 `child`，即显示所有已选中的子节点。 `parent` 策略仅在其所有子节点都被选中时显示父节点。

cascader/show-checked-strategy

:::

## 点击选中节点 ^(2.10.5)

只使用 `multiple` 或 `checkStrictly` 属性。

你可以添加 `checkOnClickNode`，使节点本身也能被点击（不仅限于前缀图标）。 通过 `showPrefix` 来切换前缀的显示与隐藏。 :::tip 添加 `checkOnClickLeaf` 属性可以仅勾选叶子节点（最末级子节点），该功能默认启用。 :::

:::demo

cascader/check-on-click-node

:::

## 自定义头部与底部 ^(2.10.5)

你可以通过插槽来自定义下拉菜单的头部和底部。

:::demo 使用插槽自定义内容。

cascader/custom-header-footer

:::

## 虚拟滚动 ^(2.14.0)

当处理大量数据时，您可以启用虚拟滚动以提高性能。

:::demo 将 `virtual-scroll` 设置为 `true` 以启用虚拟滚动。 您还可以使用 `height` 自定义菜单高度，并使用 `item-size` 自定义节点高度。 默认高度为 204px，默认节点大小为 34px。

cascader/virtual-scroll

:::

## 自定义建议面板宽度 ^(2.14.0)

建议面板（筛选时）的宽度默认会根据匹配到的选项中的最大宽度自动计算。 如果您通过 `suggestion-item` 插槽自定义建议选项，选项中显示的文本很可能不等于 `label` 的值，从而导致计算错误。 在这种情况下，您可以使用 `fit-input-width` 属性来固定其宽度。 当值为 `number` 时，宽度为固定的具体像素值。

:::tip

`fit-input-width` 属性仅控制搜索时建议面板的宽度，不影响默认的级联面板。

:::

:::demo

cascader/fit-input-width

:::

## Cascader API

### Cascader Attributes

| 属性名                                        | 说明                                                                                                        | 类型                                                                                                                                                                                     | 默认值          |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| model-value / v-model                      | 选中项绑定值                                                                                                    | ^[string] / ^[number] /^[array]`string[] \| number[] \| any`                                                                                                                         | —            |
| options                                    | 选项的数据源， `value` 和 `label` 可以通过 `CascaderProps` 自定义.                                                       | ^[array]`CascaderOption[]`                                                                                                                                                             | —            |
| [props](#cascaderprops)                    | 配置选项, 请参阅下面 `CascaderProps` 表。                                                                            | ^[object]`CascaderProps`                                                                                                                                                               | —            |
| size                                       | 尺寸                                                                                                        | ^[enum]`'large' \| 'default' \| 'small'`                                                                                                                                             | —            |
| placeholder                                | 输入框占位文本                                                                                                   | ^[string]                                                                                                                                                                              | —            |
| disabled                                   | 是否禁用                                                                                                      | ^[boolean]                                                                                                                                                                             | —            |
| clearable                                  | 是否支持清空选项                                                                                                  | ^[boolean]                                                                                                                                                                             | —            |
| clear-icon ^(2.11.0)                       | 自定义清除图标                                                                                                   | ^[string] / ^[object]`Component`                                                                                                                                                       | CircleClose  |
| show-all-levels                            | 输入框中是否显示选中值的完整路径                                                                                          | ^[boolean]                                                                                                                                                                             | true         |
| collapse-tags                              | 多选模式下是否折叠Tag                                                                                              | ^[boolean]                                                                                                                                                                             | —            |
| collapse-tags-tooltip                      | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。要使用此属性，`collapse-tags`属性必须设定为 true                                             | ^[boolean]                                                                                                                                                                             | false        |
| max-collapse-tags-tooltip-height ^(2.10.2) | collapse tags 的最大高度                                                                                       | ^[string] / ^[number]                                                                                                                                                                  | —            |
| separator                                  | 用于分隔选项的字符                                                                                                 | ^[string]                                                                                                                                                                              | ' / '        |
| filterable                                 | 该选项是否可以被搜索                                                                                                | ^[boolean]                                                                                                                                                                             | —            |
| filter-method                              | 自定义搜索逻辑，第一个参数是`node`，第二个参数是`keyword`，返回的布尔值表示是否保留该选项                                                      | ^[Function]`(node: CascaderNode, keyword: string) => boolean`                                                                                                                       | —            |
| debounce                                   | 搜索关键词正在输入时的去抖延迟，单位为毫秒                                                                                     | ^[number]                                                                                                                                                                              | 300          |
| before-filter                              | 过滤函数调用前，所要调用的钩子函数，该函数接收要过滤的值作为参数。如果该函数的返回值是 `false` 或者是一个被拒绝的 `Promise`，那么接下来的过滤逻辑便不会执行。                  | ^[Function]`(value: string) => boolean`                                                                                                                                             | —            |
| popper-class                               | Cascader 下拉菜单和标签提示的自定义类名                                                                                  | ^[string]                                                                                                                                                                              | ''           |
| popper-style                               | Cascader 下拉菜单和标签提示的自定义样式                                                                                  | ^[string] / ^[object]                                                                                                                                                                  | —            |
| teleported                                 | 弹层是否使用 teleport                                                                                           | ^[boolean]                                                                                                                                                                             | true         |
| effect ^(2.10.5)                           | tooltip 主题，内置了 `dark` / `light` 两种                                                                        | ^[enum]`'dark' \| 'light'` / ^[string]                                                                                                                                                | light        |
| tag-type                                   | 标签类型                                                                                                      | ^[enum]`'success' \| 'info' \| 'warning' \| 'danger'`                                                                                                                               | info         |
| tag-effect ^(2.7.8)                        | tag effect                                                                                                | ^[enum]`'light' \| 'dark' \| 'plain'`                                                                                                                                                | light        |
| validate-event                             | 输入时是否触发表单的校验                                                                                              | ^[boolean]                                                                                                                                                                             | true         |
| max-collapse-tags ^(2.3.10)                | 需要显示的 Tag 的最大数量要使用此功能，`collapse-tags`的值必须为true                                                            | ^[number]                                                                                                                                                                              | 1            |
| empty-values ^(2.7.0)                      | 组件的空值配置， [参考config-provider](./config-provider.md#empty-values-configurations)                            | ^[array]                                                                                                                                                                               | —            |
| value-on-clear ^(2.7.0)                    | 清空选项的值， [参考config-provider](./config-provider.md#empty-values-configurations)                             | ^[string] / ^[number] / ^[boolean] / ^[Function]                                                                                                                                       | —            |
| persistent ^(2.7.8)                        | 当下拉框未被激活并且`persistent`设置为`false`，下拉框容器会被删除。                                                               | ^[boolean]                                                                                                                                                                             | true         |
| fallback-placements ^(2.8.1)               | Tooltip 可用的 positions 请查看[popper.js 文档](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) | ^[array]`Placement[]`                                                                                                                                                                  | —            |
| placement ^(2.8.1)                         | 下拉框出现的位置                                                                                                  | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | bottom-start |
| popper-append-to-body ^(deprecated)        | 是否将弹出的内容直接插入到 body 元素。在弹出内容的边框定位出现问题时，可将该属性设置为 false                                                      | ^[boolean]                                                                                                                                                                             | true         |
| show-checked-strategy ^(2.10.5)            | 多选模式下已选节点的展示策略。当你想让显示更简洁时，使用 `parent`。当你想显示每个子项时，使用 `child`。                                              | ^[enum]`'parent' \| 'child'`                                                                                                                                                          | child        |
| virtual-scroll ^(2.14.0)                   | 是否为大数据启用虚拟滚动                                                                                              | ^[boolean]                                                                                                                                                                             | false        |
| fit-input-width ^(2.14.0)                  | 建议面板的宽度是否与输入框一致；如果值为 `number`，则宽度为固定值。                                                                    | ^[boolean] / ^[number]                                                                                                                                                                 | false        |
| item-size ^(2.14.0)                        | 虚拟滚动的节点高度 (px)                                                                                            | ^[number]                                                                                                                                                                              | 34           |
| height ^(2.14.0)                           | 虚拟滚动的菜单高度 (px)                                                                                            | ^[number]                                                                                                                                                                              | 204          |

### Cascader Events

| 事件名            | 说明                   | 类型                                                             |
| -------------- | -------------------- | -------------------------------------------------------------- |
| change         | 当绑定值变化时触发的事件         | ^[Function]`(value: CascaderValue) => void`                 |
| expand-change  | 当展开节点发生变化时触发         | ^[Function]`(value: CascaderValue) => void`                 |
| blur           | 当失去焦点时触发             | ^[Function]`(event: FocusEvent) => void`                    |
| focus          | 当获得焦点时触发             | ^[Function]`(event: FocusEvent) => void`                    |
| clear ^(2.7.7) | 可清空的单选模式下用户点击清空按钮时触发 | ^[Function]`() => void`                                     |
| visible-change | 下拉框出现/隐藏时触发          | ^[Function]`(value: boolean) => void`                       |
| remove-tag     | 在多选模式下，移除Tag时触发      | ^[Function]`(value: CascaderNode['valueByOption']) => void` |

### Cascader Slots

| 插槽名                      | 说明                              | Type                                                         |
| ------------------------ | ------------------------------- | ------------------------------------------------------------ |
| default                  | 自定义备选项的节点内容，分别为当前节点的 Node 对象和数据 | ^[object]`{ node: any, data: any }`                          |
| empty                    | 无匹配选项时的内容                       | —                                                            |
| prefix ^(2.9.4)          | 输入框头部内容                         | —                                                            |
| suggestion-item ^(2.9.5) | 搜索时自定义建议项内容                     | ^[object]`{ item: CascaderNode }`                            |
| tag ^(2.10.3)            | 自定义tag样式                        | ^[object]`{ data: Tag[], deleteTag: (tag: Tag) => void }` |
| header ^(2.10.5)         | 下拉列表顶部的内容                       | —                                                            |
| footer ^(2.10.5)         | 下拉列表底部的内容                       | —                                                            |

### Cascader Exposes

| 方法名                           | 说明                                            | 类型                                                                  |
| ----------------------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| getCheckedNodes               | 获取一个当前选中节点的数组。(仅仅是传单) 是否只返回叶选中的节点，默认是 `false` | ^[Function]`(leafOnly: boolean) => CascaderNode[] \| undefined` |
| cascaderPanelRef              | cascader 面板的 ref                              | ^[object]`ComputedRef<any>`                                   |
| togglePopperVisible ^(2.2.31) | 切换 popper 可见状态                                | ^[Function]`(visible?: boolean) => void`                         |
| contentRef                    | cascader 内容的 ref                              | ^[object]`ComputedRef<any>`                                   |
| presentText ^(2.8.4)          | 选中的内容文本                                       | ^[object]`ComputedRef<string>`                                |
| focus ^(2.11.8)               | 使 input 获取焦点                                  | ^[Function]`() => void`                                          |
| blur ^(2.11.8)                | 使 input 失去焦点                                  | ^[Function]`() => void`                                          |

## CascaderPanel API

### CascaderPanel Attributes

| 属性名                      | 说明                                                  | 类型                                                          | 默认值   |
| ------------------------ | --------------------------------------------------- | ----------------------------------------------------------- | ----- |
| model-value / v-model    | 选中项绑定值                                              | ^[string]/^[number]/^[array]`string[] \| number[] \| any` | —     |
| options                  | 选项的数据源， `value` 和 `label` 可以通过 `CascaderProps` 自定义. | ^[array]`CascaderOption[]`                                  | —     |
| [props](#cascaderprops)  | 配置选项, 请参阅下面 `CascaderProps` 表。                      | ^[object]`CascaderProps`                                    | —     |
| virtual-scroll ^(2.14.0) | 是否为大数据启用虚拟滚动                                        | ^[boolean]                                                  | false |
| item-size ^(2.14.0)      | 虚拟滚动的节点高度 (px)                                      | ^[number]                                                   | 34    |
| height ^(2.14.0)         | 虚拟滚动的菜单高度 (px)                                      | ^[number]                                                   | 204   |

### CascaderPanel Events

| 方法名               | Description                    | Type                                                         |
| ----------------- | ------------------------------ | ------------------------------------------------------------ |
| change            | 当选中节点变化时触发                     | ^[Function]`(value: CascaderValue \| undefined) => void` |
| update:modelValue | 当绑定值变化时触发的事件                   | ^[Function]`(value: CascaderValue \| undefined) => void` |
| expand-change     | 当展开节点发生变化时触发                   | ^[Function]`(value: CascaderNodePathValue) => void`       |
| close             | 面板的关闭事件，提供给 Cascader 以便做更好的判断。 | ^[Function]`() => void`                                   |

### CascaderPanel Slots

| 事件名            | 说明                           | Type                                |
| -------------- | ---------------------------- | ----------------------------------- |
| default        | 下级节点的自定义内容，它们分别是当前节点对象和节点数据。 | ^[object]`{ node: any, data: any }` |
| empty ^(2.8.3) | 没有数据时面板的内容。                  | —                                   |

### CascaderPanel Exposes

| 属性名               | 说明                                            | Type                                                                |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------- |
| getCheckedNodes   | 获取一个当前选中节点的数组。(仅仅是传单) 是否只返回叶选中的节点，默认是 `false` | ^[Function]`(leafOnly: boolean) => CascaderNode[] \| undefined` |
| clearCheckedNodes | 清空选中的节点                                       | ^[Function]`() => void`                                          |

## CascaderProps

| 属性                         | 说明                                                         | 类型                                                                            | 默认值      |
| -------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| expandTrigger              | 次级菜单的展开方式                                                  | ^[enum]`'click' \| 'hover'`                                                  | click    |
| multiple                   | 是否多选                                                       | ^[boolean]                                                                    | false    |
| checkStrictly              | 是否严格的遵守父子节点不互相关联                                           | ^[boolean]                                                                    | false    |
| emitPath                   | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值       | ^[boolean]                                                                    | true     |
| lazy                       | 是否动态加载子节点，需与 lazyLoad 方法结合使用                               | ^[boolean]                                                                    | false    |
| lazyLoad                   | 加载动态数据的方法，仅在 lazy 为 true 时有效 reject 参数在 ^(2.11.5) 版本及以上支持。 | ^[Function]`(node: Node, resolve: Resolve, reject: () => void) => void` | —        |
| value                      | 指定选项的值为选项对象的某个属性值                                          | ^[string]                                                                     | value    |
| label                      | 指定选项标签为选项对象的某个属性值                                          | ^[string]                                                                     | label    |
| children                   | 指定选项的子选项为选项对象的某个属性值                                        | ^[string]                                                                     | children |
| disabled                   | 指定选项的禁用为选项对象的某个属性值                                         | ^[string]                                                                     | disabled |
| leaf                       | 指定选项的叶子节点的标志位为选项对象的某个属性值                                   | ^[string]                                                                     | leaf     |
| hoverThreshold             | hover 时展开菜单的灵敏度阈值                                          | ^[number]                                                                     | 500      |
| checkOnClickNode ^(2.10.5) | 点击节点时是否选中或取消选中该节点                                          | ^[boolean]                                                                    | false    |
| checkOnClickLeaf ^(2.10.5) | 点击叶子节点（最后一级子节点）时，是否选中或取消选中该节点                              | ^[boolean]                                                                    | true     |
| showPrefix ^(2.10.5)       | 是否显示单选框或复选框的前缀（图标）                                         | ^[boolean]                                                                    | true     |

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type CascaderNodeValue = string | number
type CascaderNodePathValue = CascaderNodeValue[]
type CascaderValue =
  | CascaderNodeValue
  | CascaderNodePathValue
  | (CascaderNodeValue | CascaderNodePathValue)[]

type Resolve = (data: any) => void

type ExpandTrigger = 'click' | 'hover'

type LazyLoad = (node: Node, resolve: Resolve, reject: () => void) => void

type isDisabled = (data: CascaderOption, node: Node) => boolean

type isLeaf = (data: CascaderOption, node: Node) => boolean

interface CascaderOption extends Record<string, unknown> {
  label?: string
  value?: CascaderNodeValue
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
}

interface CascaderProps {
  expandTrigger?: ExpandTrigger
  multiple?: boolean
  checkStrictly?: boolean
  emitPath?: boolean
  lazy?: boolean
  lazyLoad?: LazyLoad
  value?: string
  label?: string
  children?: string
  disabled?: string | isDisabled
  leaf?: string | isLeaf
  hoverThreshold?: number
}

class Node {
  readonly uid: number
  readonly level: number
  readonly value: CascaderNodeValue
  readonly label: string
  readonly pathNodes: Node[]
  readonly pathValues: CascaderNodePathValue
  readonly pathLabels: string[]

  childrenData: ChildrenData
  children: Node[]
  text: string
  loaded: boolean
  /**
   * Is it checked
   *
   * @default false
   */
  checked: boolean
  /**
   * Used to indicate the intermediate state of unchecked and fully checked child nodes
   *
   * @default false
   */
  indeterminate: boolean
  /**
   * Loading Status
   *
   * @default false
   */
  loading: boolean

  // getter
  isDisabled: boolean
  isLeaf: boolean
  valueByOption: CascaderNodeValue | CascaderNodePathValue

  // method
  appendChild(childData: CascaderOption): Node
  calcText(allLevels: boolean, separator: string): string
  broadcast(): void
  emit(): void
  onParentCheck(checked: boolean): void
  onChildCheck(): void
  setCheckState(checked: boolean): void
  doCheck(checked: boolean): void
}

Node as CascaderNode
```

</details>
