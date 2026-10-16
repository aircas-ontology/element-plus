---
title: 标签输入框
lang: zh-CN
---

# InputTag 标签输入框

InputTag 组件允许用户添加内容作为标签

## 基础用法

按Enter回车键添加输入内容为标签

:::demo

input-tag/basic

:::

## 自定义触发器

您可以自定义用于触发输入标签的键位，默认是Enter 回车键

:::demo

input-tag/trigger

:::

## 最大标签数

您可以设置可以添加的标签数量限制。

:::demo

input-tag/max

:::

## 折叠标签^(2.11.0)

使用折叠标签属性将它们合并成一块文本。您可以使用折叠标签工具提示属性来启用悬停在折叠文本上的行为来显示特定的选定值。使用折叠标签工具提示属性会使最大属性无效。

:::demo

input-tag/collapse

:::

## 禁用状态

您可以设置 InputTag 被禁用。

:::demo

input-tag/disabled

:::

## 可清空

您可以设置是否显示清除按钮。

:::demo

input-tag/clearable

:::

## 自定义清除图标^(2.11.0)

你可以通过<code>clear-icon</code>属性自定义清除图标

:::demo

input-tag/clear-icon

:::

## 可拖放

您可以设置是否可以拖动标签。

:::demo

input-tag/draggable

:::

## 分隔符^(2.9.9)

当一个分隔符匹配时，您可以添加一个标签。

:::demo

input-tag/delimiter

:::

## 尺寸

使用 <code>size</code> 属性改变输入框大小。除了默认大小外，还有另外两个选项： <code>large</code>, <code>small</code>。

:::demo

input-tag/size

:::

## 自定义标签

您可以通过`tag`插槽自定义标签内容。

:::demo

input-tag/tag

:::

## 自定义前缀和后缀

您可以通过`prefix`和 `suffix` 插槽自定义 InputTag 的前缀和后缀。

:::demo

input-tag/prefix-suffix

:::

## API

### 属性

| 名称                                                                                 | 详情                                                                    | 类型                                                                                                                                                        | 默认          |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| model-value / v-model                                                              | 绑定值                                                                   | ^[array]`string[]`                                                                                    | —           |
| max                                                                                | 可添加标签的最大数量                                                            | ^[number]                                                                                             | —           |
| tag-type                                                                           | 标签类型                                                                  | ^[enum]`'' \| 'success' \| 'info' \| 'warning' \| 'danger'`                                           | info        |
| tag-effect                                                                         | 标签效果                                                                  | ^[enum]`'' \| 'light' \| 'dark' \| 'plain'`                                                           | light       |
| effect ^(2.13.2)                | tooltip 主题，内置了 <code>dark</code> / <code>light</code> 两种              | ^[enum]<code>'dark' \| 'light'</code> / ^[string] | light       |
| trigger                                                                            | 触发输入标签的按键                                                             | ^[enum]`'Enter' \| 'Space'`                                                                           | Enter       |
| draggable                                                                          | 是否可以拖动标签                                                              | ^[boolean]                                                                                            | false       |
| delimiter ^(2.9.9)              | 在匹配分隔符时添加标签                                                           | ^[string] / ^[regex]                              | —           |
| size                                                                               | 输入框尺寸                                                                 | ^[enum]`'large' \| 'default' \| 'small'`                                                              | —           |
| collapse-tags ^(2.11.0)         | 多选时是否将选中值按文字的形式展示                                                     | ^[boolean]                                                                                            | false       |
| collapse-tags-tooltip ^(2.11.0) | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。要使用此功能，<code>collapse-tags</code>的值必须为true | ^[boolean]                                                                                            | false       |
| save-on-blur ^(2.9.7)           | 当输入失去焦点时是否保存输入值                                                       | ^[boolean]                                                                                            | true        |
| clearable                                                                          | 是否显示清除按钮                                                              | ^[boolean]                                                                                            | false       |
| clear-icon ^(2.11.0)            | 自定义清除图标                                                               | ^[string] / ^[object]`Component`                  | CircleClose |
| disabled                                                                           | 是否禁用                                                                  | ^[boolean]                                                                                            | false       |
| validate-event                                                                     | 是否触发表单验证                                                              | ^[boolean]                                                                                            | true        |
| readonly                                                                           | 等价于原生 <code>readonly</code> 属性                                        | ^[boolean]                                                                                            | false       |
| autofocus                                                                          | 等价于原生 <code> autofocus </code> 属性                                     | ^[boolean]                                                                                            | false       |
| id                                                                                 | 等价于原生 input <code>id</code> 属性                                        | ^[string]                                                                                             | —           |
| tabindex                                                                           | 等价于原生 <code> tabindex </code> 属性                                      | ^[string] / ^[number]                             | —           |
| max-collapse-tags ^(2.11.0)     | 需要显示的 Tag 的最大数量要使用此功能，<code>collapse-tags</code>的值必须为true             | ^[number]                                                                                             | 1           |
| maxlength                                                                          | 等价于原生 <code> maxlength </code> 属性                                     | ^[string] / ^[number]                             | —           |
| minlength                                                                          | 等价于原生 <code> minlength </code> 属性                                     | ^[string] / ^[number]                             | —           |
| placeholder                                                                        | 输入框占位文本                                                               | ^[string]                                                                                             | —           |
| autocomplete                                                                       | 等价于原生 <code> autocomplete </code> 属性                                  | ^[string]                                                                                             | off         |
| aria-label ^(a11y)                                              | 等价于原生 <code> aria-label </code> 属性                                    | ^[string]                                                                                             | —           |

### 事件

| 名称                                                                    | 详情              | 类型                                                                                                                           |
| --------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| change                                                                | 绑定值变化时触发的事件     | ^[Function]`(value: string[]) => void`                                   |
| input                                                                 | 在 Input 值改变时触发  | ^[Function]`(value: string) => void`                                     |
| add-tag                                                               | tag 被添加时触发      | ^[Function]`(value: string \| string []) => void`                        |
| remove-tag                                                            | tag 被移除时触发      | ^[Function]`(value: string, index: number) => void`                      |
| drag-tag ^(2.11.3) | tag 被拖动时触发      | ^[Function]`(oldIndex: number, newIndex: number, value: string) => void` |
| focus                                                                 | 在 Input 获得焦点时触发 | ^[Function]`(event: FocusEvent) => void`                                 |
| blur                                                                  | 在 Input 失去焦点时触发 | ^[Function]`(event: FocusEvent) => void`                                 |
| clear                                                                 | 点击清除图标时触发       | ^[Function]`() => void`                                                  |

### Slots

| 名称     | 详情            | 类型                                                                                              |
| ------ | ------------- | ----------------------------------------------------------------------------------------------- |
| tag    | 作为tag的内容      | ^[object]`{ value: string, index: number }` |
| prefix | InputTag 头部内容 | —                                                                                               |
| suffix | InputTag 尾部内容 | —                                                                                               |

### 对外暴露的方法

| 名称    | 详情           | 类型                                                                          |
| ----- | ------------ | --------------------------------------------------------------------------- |
| focus | 使 input 获取焦点 | ^[Function]`() => void` |
| blur  | 使 input 失去焦点 | ^[Function]`() => void` |
