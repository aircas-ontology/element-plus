---
title: Select 选择器
lang: zh-CN
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

:::tip

在版本 `2.5.0`之后， `el-select` 的默认宽度更改为 `100%` 当使用内联形式时，宽度将显示异常。为了保持显示正常, 您需要手动配置 `el-select` 的宽度 (如: [例子](https://github.com/element-plus/element-plus/issues/15834#issuecomment-1936919229)).

:::

## 基础用法

:::demo 适用广泛的基础单选 `v-model` 的值为当前被选中的 `el-option` 的 value 属性值

select/basic-usage

:::

## Options 属性 ^(2.10.5)

:::demo `el-option` 基本用法。您可以通过 `props` 属性自定义 `options` 的别名。

select/options

:::

## 有禁用选项

:::demo 在 `el-option` 中，设定 `disabled` 值为 true，即可禁用该选项

select/disabled-option

:::

## 禁用状态

禁用整个选择器组件

:::demo 为 `el-select` 设置 `disabled`属性，则整个选择器不可用。

select/disabled

:::

## 可清空

您可以使用清除图标来清除选择。

:::demo 为 `el-select` 设置 `clearable` 属性，则可将选择器清空。

select/clearable

:::

## 尺寸

:::demo 使用 `size` 属性改变选择器大小。除了默认大小外，还有另外两个选项： `large`, `small`。

select/size

:::

## 基础多选

多选选择器使用 tag 组件来展示已选中的选项。

:::demo 为 `el-select` 设置 `multiple` 属性即可启用多选，此时 `v-model` 的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 组件的形式展现，你也可以设置 `collapse-tags` 属性将它们合并为一段文字。您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

select/multiple

:::

## 自定义模板

你可以自定义如何来渲染每一个选项。

:::demo 将自定义的 HTML 模板插入 `el-option` 的 slot 中即可。

select/custom-template

:::

## 自定义下拉菜单的头部 ^(2.4.3)

您可以自定义下拉菜单的头部。

:::demo Use slot to customize the content.

select/custom-header

:::

## 自定义下拉菜单的底部 ^(2.4.3)

您可以自定义下拉菜单的底部。

::: demo 使用slot 自定义内容

select/custom-footer

:::

## 将选项进行分组

你可以为选项进行分组来区分不同的选项

:::demo 使用 `el-option-group` 对备选项进行分组，它的 `label` 属性为分组名

select/grouping

:::

## 筛选选项

可以利用筛选功能快速查找选项。

:::demo 为`el-select`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有 `label` 属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个 `filter-method` 来实现。 `filter-method` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。

select/filterable

:::

## 远程搜索

输入关键字以从远程服务器中查找数据。

:::demo 从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remote-method`。 `remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。需要注意的是，如果 `el-option` 是通过 `v-for` 指令渲染出来的，此时需要为 `el-option` 添加 `key` 属性，且其值需具有唯一性，比如这个例子中的 `item.value`。

select/remote-search

:::

## 创建新的选项

创建并选中未包含在初始选项中的条目。

:::demo 通过使用 `allow-create` 属性，用户可以通过输入框创建新项目。为了使 `allow-create` 正常工作， `filterable` 的值必须为 `true`。本例还使用了 `default-first-option` 属性，在该属性为 `true` 的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

select/allow-create

:::

## 使用值键 value-key 属性

如果 Select 的绑定值为对象类型，请务必指定 `value-key` 作为它的唯一性标识。

:::demo 通过使用 `value-key` 属性，可以正确处理带有重复label的数据。这样虽然`label` 是重复的，但任可通过 `id` 来确认唯一性。

select/value-key

:::

## 自定义标签 ^(2.5.0)

您可以自定义标签。

:::demo 将自定义的标签插入 `el-select` 的 slot 中即可。 `collapse-tags`, `collapse-tags-tooltip`, `max-collapse-tags` 在此模式下不生效.

select/custom-tag

:::

## 自定义加载 ^(2.5.2)

修改加载区域内容

:::demo

select/custom-loading

:::

## 空值配置^(2.7.0)

若想配置如空字符串为有效值而不是空值，可以配置 `empty-values` 为 `[null, undefined]`.

如果您想要将清空值更改为 `null`, 请设置 `value-on-clear` 为 `null`

:::demo

select/empty-values

:::

## 自定义标签 ^(2.7.4)

您可以自定义标签

:::demo

select/custom-label

:::

## Select API

### Select Attributes

| 属性名                                   | 说明                                                                                                         | 类型                                                                                                                                                                                     | Default                                        |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| model-value / v-model                 | 选中项绑定值                                                                                                     | ^[string] / ^[number] / ^[boolean] / ^[object] / ^[array]                                                                                                                              | —                                              |
| multiple                              | 是否多选                                                                                                       | ^[boolean]                                                                                                                                                                             | false                                          |
| options ^(2.10.5)                     | 选项的数据源， `value` 的 key 和 `label` 和 ` disabled`可以通过 `props`自定义.                                              | ^[array]`Array<{[key: string]: any}>`                                                                                                                                            | —                                              |
| [props](#props) ^(2.10.5)             | options 的配置                                                                                                | ^[object]                                                                                                                                                                              | —                                              |
| disabled                              | 是否禁用                                                                                                       | ^[boolean]                                                                                                                                                                             | false                                          |
| value-key                             | 作为 value 唯一标识的键名，绑定值为对象类型时必填                                                                               | ^[string]                                                                                                                                                                              | value                                          |
| size                                  | 输入框尺寸                                                                                                      | ^[enum]`'' \| 'large' \| 'default' \| 'small'`                                                                                                                                      | —                                              |
| clearable                             | 是否可以清空选项                                                                                                   | ^[boolean]                                                                                                                                                                             | false                                          |
| collapse-tags                         | 多选时是否将选中值按文字的形式展示                                                                                          | ^[boolean]                                                                                                                                                                             | false                                          |
| collapse-tags-tooltip ^(2.3.0)        | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。要使用此属性，`collapse-tags`属性必须设定为 true                                              | ^[boolean]                                                                                                                                                                             | false                                          |
| [tag-tooltip](#tag-tooltip) ^(2.13.3) | 折叠标签工具提示的配置对象。要使用此项， `collapse-tags` 和 `collapse-tags-tooltip` 必须为 true                                    | ^[object]`TagTooltipProps`                                                                                                                                                             | {}                                             |
| multiple-limit                        | `multiple` 属性设置为 `true` 时，代表多选场景下用户最多可以选择的项目数，为 0 则不限制                                                     | ^[number]                                                                                                                                                                              | 0                                              |
| id                                    | 原生 input 的 id                                                                                              | ^[string]                                                                                                                                                                              | —                                              |
| name                                  | Select 输入框的原生 name 属性                                                                                      | ^[string]                                                                                                                                                                              | —                                              |
| effect                                | tooltip 主题，内置了 `dark` / `light` 两种                                                                         | ^[enum]`'dark' \| 'light'` / ^[string]                                                                                                                                                | light                                          |
| autocomplete                          | Select 输入框的原生 autocomplete 属性                                                                              | ^[string]                                                                                                                                                                              | off                                            |
| placeholder                           | 占位符，默认为“Select”                                                                                            | ^[string]                                                                                                                                                                              | —                                              |
| filterable                            | Select 组件是否可筛选                                                                                             | ^[boolean]                                                                                                                                                                             | false                                          |
| allow-create                          | 是否允许用户创建新条目，当`filterable`设置为 true 时才会生效                                                                    | ^[boolean]                                                                                                                                                                             | false                                          |
| filter-method                         | 自定义筛选方法的第一个参数是当前输入的值。只有当 `filterable` 设置为 true 时才会生效。                                                      | ^[Function]`(query: string) => void`                                                                                                                                                | —                                              |
| remote                                | 其中的选项是否从服务器远程加载                                                                                            | ^[boolean]                                                                                                                                                                             | false                                          |
| debounce ^(2.11.7)                    | 远程搜索时的防抖延迟（以毫秒为单位）                                                                                         | ^[number]                                                                                                                                                                              | 300                                            |
| remote-method                         | 当输入值发生变化时触发的函数。它的参数就是当前的输入值。当`filterable`设置为 true 时才会生效                                                    | ^[Function]`(query: string) => void`                                                                                                                                                | —                                              |
| remote-show-suffix                    | 远程搜索方法显示后缀图标                                                                                               | ^[boolean]                                                                                                                                                                             | false                                          |
| loading                               | 是否正在从远程获取数据                                                                                                | ^[boolean]                                                                                                                                                                             | false                                          |
| loading-text                          | 从服务器加载数据时显示的文本，默认为“Loading”                                                                                | ^[string]                                                                                                                                                                              | —                                              |
| no-match-text                         | 搜索条件无匹配时显示的文字，也可以使用 `empty` 插槽设置，默认是 “No matching data'”                                                   | ^[string]                                                                                                                                                                              | —                                              |
| no-data-text                          | 无选项时显示的文字，也可以使用 `empty` 插槽设置自定义内容，默认是 “No data”                                                            | ^[string]                                                                                                                                                                              | —                                              |
| popper-class                          | 为 Select 下拉菜单和标签提示设置自定义类名                                                                                  | ^[string]                                                                                                                                                                              | ''                                             |
| popper-style ^(2.11.0)                | 为 Select 下拉菜单和标签提示设置自定义样式                                                                                  | ^[string] / ^[object]                                                                                                                                                                  | —                                              |
| reserve-keyword                       | 当 `multiple` 和 `filterable`被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词                                                | ^[boolean]                                                                                                                                                                             | true                                           |
| default-first-option                  | 是否在输入框按下回车时，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用                                                        | ^[boolean]                                                                                                                                                                             | false                                          |
| teleported                            | 是否使用 teleport。设置成 `true`则会被追加到 `append-to` 的位置                                                             | ^[boolean]                                                                                                                                                                             | true                                           |
| append-to ^(2.8.4)                    | 下拉框挂载到哪个 DOM 元素                                                                                            | ^[CSSSelector] / ^[HTMLElement]                                                                                                                                                        | —                                              |
| persistent                            | 当下拉选择器未被激活并且`persistent`设置为`false`，选择器会被删除。                                                                | ^[boolean]                                                                                                                                                                             | true                                           |
| automatic-dropdown                    | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单                                                                         | ^[boolean]                                                                                                                                                                             | false                                          |
| clear-icon                            | 自定义清除图标                                                                                                    | ^[string] / ^[object]`Component`                                                                                                                                                       | CircleClose                                    |
| fit-input-width                       | 下拉框的宽度是否与输入框相同                                                                                             | ^[boolean]                                                                                                                                                                             | false                                          |
| suffix-icon                           | 自定义后缀图标组件                                                                                                  | ^[string] / ^[object]`Component`                                                                                                                                                       | ArrowDown                                      |
| tag-type                              | 标签类型                                                                                                       | ^[enum]`'' \| 'success' \| 'info' \| 'warning' \| 'danger'`                                                                                                                        | info                                           |
| tag-effect ^(2.7.7)                   | 标签效果                                                                                                       | ^[enum]`'' \| 'light' \| 'dark' \| 'plain'`                                                                                                                                         | light                                          |
| validate-event                        | 是否触发表单验证                                                                                                   | ^[boolean]                                                                                                                                                                             | true                                           |
| offset ^(2.8.8)                       | 下拉面板偏移量                                                                                                    | ^[number]                                                                                                                                                                              | 12                                             |
| show-arrow ^(2.8.8)                   | 下拉菜单的内容是否有箭头                                                                                               | ^[boolean]                                                                                                                                                                             | true                                           |
| placement ^(2.2.17)                   | 下拉框出现的位置                                                                                                   | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | bottom-start                                   |
| fallback-placements ^(2.5.6)          | dropdown 可用的 positions 请查看[popper.js 文档](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) | ^[array]`Placement[]`                                                                                                                                                                  | ['bottom-start', 'top-start', 'right', 'left'] |
| max-collapse-tags ^(2.3.0)            | 需要显示的 Tag 的最大数量只有当 `collapse-tags` 设置为 true 时才会生效。                                                         | ^[number]                                                                                                                                                                              | 1                                              |
| popper-options                        | [popper.js](https://popper.js.org/docs/v2/) 参数                                                             | ^[object]refer to [popper.js](https://popper.js.org/docs/v2/) doc                                                                                                                      | {}                                             |
| aria-label ^(a11y)                    | 等价于原生 input `aria-label` 属性                                                                                | ^[string]                                                                                                                                                                              | —                                              |
| empty-values ^(2.7.0)                 | 组件的空值配置， [参考config-provider](./config-provider.md#empty-values-configurations)                             | ^[array]                                                                                                                                                                               | —                                              |
| value-on-clear ^(2.7.0)               | 清空选项的值， [参考config-provider](./config-provider.md#empty-values-configurations)                              | ^[string] / ^[number] / ^[boolean] / ^[Function]                                                                                                                                       | —                                              |
| suffix-transition ^(deprecated)       | 下拉菜单显示/消失时后缀图标的动画                                                                                          | ^[boolean]                                                                                                                                                                             | true                                           |
| tabindex ^(2.9.0)                     | input 的 tabindex                                                                                           | ^[string] / ^[number]                                                                                                                                                                  | —                                              |

:::warning

`suffix-transition` 已被 **弃用**, 并 **将会** 在<VersionTag version="2.4.0" />中删除, 请使用覆盖样式方案。

:::

### Props

| Attribute         | 说明                  | Type      | Default  |
| ----------------- | ------------------- | --------- | -------- |
| value             | 指定选项的值为选项对象的某个属性值   | ^[string] | value    |
| label             | 指定节点标签为节点对象的某个属性值   | ^[string] | label    |
| options ^(2.11.0) | 指定选项的子选项为选项对象的某个属性值 | ^[string] | options  |
| disabled          | 指定选项的禁用为选项对象的某个属性值  | ^[string] | disabled |

### tag-tooltip ^(2.13.3)

:::tip 备用机制

标签工具提示中的属性遵循此优先级顺序：

1. 在标签工具提示对象中明确定义的字段。
2. 从 el-select 继承的共享属性（例如 effect、popper-class、popper-style、teleported、append-to、popper-options）。
3. 底层 el-tooltip 组件的默认值。这样，您就可以覆盖标签的特定工具提示行为，同时保持与默认的“选择”下拉菜单的一致性。

:::

:::tip 自定义容器位置

当将 Tooltip 添加到自定义容器时（通过 `append-to` 属性），应将容器配置为 `position: relative` 或 `position: absolute`，以确保准确定位。此外，如果需要防止工具提示超出其边界，可以对容器应用 `overflow: hidden`。

:::

| 属性                  | 说明                                                                                                        | 类型                                                                                                                                                                                     | 默认值                                |
| ------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| append-to           | 指示 Tooltip 的内容将附加在哪一个网页元素上                                                                                | ^[CSSSelector] / ^[HTMLElement]                                                                                                                                                        | —                                  |
| placement           | Tooltip 组件出现的位置                                                                                           | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | bottom                             |
| fallback-placements | Tooltip 可用的 positions 请查看[popper.js 文档](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements) | ^[array]`Placement[]`                                                                                                                                                                  | ['bottom', 'top', 'right', 'left'] |
| effect              | 文字提示（Tooltip）的主题，内置`dark`和`light`两种。                                                                      | ^[enum]`'dark' \| 'light'` / ^[string]                                                                                                                                                | —                                  |
| popper-class        | 为 Tooltip 的 popper 添加自定义类名                                                                                | ^[string]                                                                                                                                                                              | —                                  |
| popper-style        | 为 Tooltip 的 popper 添加自定义样式                                                                                | ^[string] / ^[object]                                                                                                                                                                  | —                                  |
| transition          | Tooltip 所应用过渡动画的名称                                                                                        | ^[string]                                                                                                                                                                              | —                                  |
| teleported          | 是否使用 teleport。设置成 `true`则会被追加到 `append-to` 的位置                                                            | ^[boolean]                                                                                                                                                                             | —                                  |
| popper-options      | [popper.js](https://popper.js.org/docs/v2/) 参数                                                            | ^[object]refer to [popper.js](https://popper.js.org/docs/v2/) doc                                                                                                                      | —                                  |
| show-after          | 在触发后多久显示内容，单位毫秒                                                                                           | ^[number]                                                                                                                                                                              | —                                  |
| hide-after          | 关闭时的延迟                                                                                                    | ^[number]                                                                                                                                                                              | —                                  |
| auto-close          | tooltip 出现后自动隐藏延时，单位毫秒                                                                                    | ^[number]                                                                                                                                                                              | —                                  |
| offset              | Tooltip 出现位置的偏移量                                                                                          | ^[number]                                                                                                                                                                              | —                                  |

### Select Events

| 事件名                   | 说明                   | Type                                                                           |
| --------------------- | -------------------- | ------------------------------------------------------------------------------ |
| change                | 选中值发生变化时触发           | ^[Function]`(value: any) => void`                                           |
| visible-change        | 下拉框出现/隐藏时触发          | ^[Function]`(visible: boolean) => void`                                     |
| remove-tag            | 多选模式下移除tag时触发        | ^[Function]`(tagValue: any) => void`                                        |
| clear                 | 可清空的单选模式下用户点击清空按钮时触发 | ^[Function]`() => void`                                                     |
| blur                  | 当 input 失去焦点时触发      | ^[Function]`(event: FocusEvent) => void`                                    |
| focus                 | 当 input 获得焦点时触发      | ^[Function]`(event: FocusEvent) => void`                                    |
| popup-scroll ^(2.9.4) | 下拉滚动时触发              | ^[Function]`(data:{scrollTop: number, scrollLeft: number}) => void`         |
| end-reached ^(2.14.0) | 下拉滚动到结束时触发器          | ^[Function]`(direction: 'top' \| 'bottom' \| 'left' \| 'right') => void` |

### Select Slots

| 插槽名              | 说明                                                                              | 子标签                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| default          | option 组件列表                                                                     | Option Group / Option                                                                                                    |
| header ^(2.4.3)  | 下拉列表顶部的内容                                                                       | —                                                                                                                        |
| footer ^(2.4.3)  | 下拉列表底部的内容                                                                       | —                                                                                                                        |
| prefix           | Select 组件头部内容                                                                   | —                                                                                                                        |
| empty            | 无选项时的列表                                                                         | :::                                                                                                                      |
| tag ^(2.5.0)     | 作为 Select 组件的内容时，子标签 `data`、`selectDisabled` 和 `deleteTag` 是在版本 ^(2.10.3) 中新增的。 | ^[object]`{ data: OptionBasic[], selectDisabled: boolean, deleteTag: (event: MouseEvent, tag: OptionBasic) => void }` |
| loading ^(2.5.2) | select 组件自定义 loading内容                                                          | —                                                                                                                        |
| label ^(2.7.4)   | select 组件自定义标签内容 `index` 引入于^(2.11.2)                                           | ^[object]`{ index: number, label: string \| any, value: string \| any }`                                               |

### Select Exposes

| 方法名                    | 详情                  | 类型                                                |
| ---------------------- | ------------------- | ------------------------------------------------- |
| focus                  | 使选择器的输入框获取焦点        | ^[Function]`() => void`                        |
| blur                   | 使选择器的输入框失去焦点，并隐藏下拉框 | ^[Function]`() => void`                        |
| selectedLabel ^(2.8.5) | 获取当前选中的标签           | ^[object]`ComputedRef<string \| string[]>` |

## Option Group API

### Option Group Attributes

| 名称       | 详情              | 类型         | 默认值   |
| -------- | --------------- | ---------- | ----- |
| label    | 分组的名称           | ^[string]  | —     |
| disabled | 是否将该分组下所有选项置为禁用 | ^[boolean] | false |

### Option Group Slots

| 插槽名     | 说明      | Subtags |
| ------- | ------- | ------- |
| default | 自定义默认内容 | Option  |

## Option API

### Option Attributes

| Name     | 描述                      | 类型                                             | 默认值   |
| -------- | ----------------------- | ---------------------------------------------- | ----- |
| value    | 选项的值                    | ^[string] / ^[number] / ^[boolean] / ^[object] | —     |
| label    | 选项的标签，若不设置则默认与`value`相同 | ^[string] / ^[number]                          | —     |
| disabled | 是否禁用该选项                 | ^[boolean]                                     | false |

### Option Slots

| 名称      | 说明     |
| ------- | ------ |
| default | 默认插槽内容 |
