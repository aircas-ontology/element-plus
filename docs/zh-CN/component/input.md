---
title: Input 输入框
lang: zh-CN
---

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

:::demo

input/basic

:::

## 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件

input/disabled

:::

## 一键清空

:::demo 使用`clearable`属性即可得到一个可一键清空的输入框在版本 ^(2.13.4) 之后，Input 的 textarea 类型也支持 clearable 功能。

input/clearable

:::

## 自定义清除图标^(2.11.0)

:::demo 你可以通过`clear-icon`属性自定义清除图标

input/clear-icon

:::

## 格式化

在 `formatter`的情况下显示值，我们通常同时使用 `parser`

:::demo

input/formatter

:::

## 密码框

:::demo 使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框自 ^(2.13.6) 起，支持使用 `password-icon` 插槽覆盖默认图标。

input/password

:::

## 带图标的输入框

带有图标标记输入类型

:::demo 要在输入框中添加图标，你可以简单地使用 `prefix-icon` 和 `suffix-icon` 属性。另外， `prefix` 和 `suffix` 命名的插槽也能正常工作。

input/with-icon

:::

## 文本域

用于输入多行文本信息可缩放的输入框。添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

:::demo 文本域高度可通过 `rows` 属性控制

input/textarea

:::

## 自适应文本域

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。

:::demo

input/auto-sizing-textarea

:::

## 复合型输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮。

:::demo 可通过 `slot` 来指定在 Input 中分发的前置或者后置的内容。

input/mixed-input

:::

## 尺寸

:::demo 使用 `size` 属性改变输入框大小。除了默认大小外，还有另外两个选项： `large`, `small`。

input/various-size

:::

## 输入长度限制

:::demo 使用 `maxlength` 和 `minlength` 属性, 来控制输入内容的最大字数和最小字数。"字符数"使用JavaScript字符串长度来衡量。 为文本或文本输入类型设置 `maxlength` prop可以限制输入值的长度。 允许你通过设置 `show-word-limit` 到 `true` 来显示剩余字数。从 ^(2.11.5) 版本开始，你可以将 `word-limit-position` 设置为 `outside`，以在输入框外显示字数统计。

input/length-limiting

:::

## 计数图形^(2.13.7)

:::demo 设置 `count-graphemes` 以计算文本长度。如果设置了该属性，则不会使用原生的 `maxlength` 和 `minlength`。

input/count-graphemes

:::

:::tip

**浏览器支持 & 回退策略**

当使用 `count-graphemes` prop时，组件使用以下方法：

- **主要**: 使用 `Intl.Segmenter` API (Chrome 87+, Firefox 125+, Safari 14.1+) 进行适当的图形集群处理。它能够正确处理复杂的表情符号、组合标记和0宽度连接符序列。

- **回退**: 旧版浏览器会回退到 `Array.from()` 进行基于码点的迭代。请注意，这可能会拆分多码点字形序列（例如，带有肤色修饰符的表情符号）。

在实现自己的 `count-graphemes` 函数时，如果需要对复杂的 unicode 字符提供强大的支持，请考虑使用 `Intl.Segmenter`。

:::

## API

### Attributes

| 属性名                           | 说明                                                                                                                                                           | 类型                                                                                                         | 默认值         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ----------- |
| type                          | 输入类型，更多信息请参见 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)                                                   | ^[string]`'text' \| 'textarea' \| 'number' \| 'password' \| 'email' \| 'search' \| 'tel' \|  'url'` | text        |
| model-value / v-model         | 绑定值                                                                                                                                                          | ^[string] / ^[number]                                                                                      | —           |
| model-modifiers ^(2.11.5)     | v-model 修饰符，参考 [Vue 修饰符](https://vuejs.org/guide/essentials/forms.html#modifiers)                                                                            | ^[object]`{ lazy?: true, number?: true, trim?: true }`                                                     | —           |
| maxlength                     | 同原生 `maxlength` 属性                                                                                                                                           | ^[string] / ^[number]                                                                                      | —           |
| minlength                     | 原生属性，最小输入长度                                                                                                                                                  | ^[string] / ^[number]                                                                                      | —           |
| show-word-limit               | 是否显示统计字数, 只在 `type` 为 'text' 或 'textarea' 的时候生效                                                                                                              | ^[boolean]                                                                                                 | false       |
| word-limit-position ^(2.11.5) | 字数统计的位置，仅当 `show-word-limit` 为 `true` 时生效。                                                                                                                   | ^[enum]`'inside' \| 'outside'`                                                                            | "inside"    |
| placeholder                   | 输入框占位文本                                                                                                                                                      | ^[string]                                                                                                  | —           |
| clearable                     | 是否显示清除按钮，只有当 `type` 不是 textarea时生效                                                                                                                           | ^[boolean]                                                                                                 | false       |
| clear-icon ^(2.11.0)          | 自定义清除图标                                                                                                                                                      | ^[string] / ^[object]`Component`                                                                           | CircleClose |
| formatter                     | 指定输入值的格式。(只有当 `type` 是"text"时才能工作)                                                                                                                           | ^[Function]`(value: string \| number) => string`                                                       | —           |
| parser                        | 指定从格式化器输入中提取的值。(仅当 `type` 是"text"时才起作用)                                                                                                                      | ^[Function]`(value: string) => string`                                                                  | —           |
| show-password                 | 是否显示切换密码图标                                                                                                                                                   | ^[boolean]                                                                                                 | false       |
| disabled                      | 是否禁用                                                                                                                                                         | ^[boolean]                                                                                                 | false       |
| size                          | 输入框尺寸，只在 `type` 不为 'textarea' 时有效                                                                                                                            | ^[enum]`'large' \| 'default' \| 'small'`                                                                 | —           |
| prefix-icon                   | 自定义前缀图标                                                                                                                                                      | ^[string] / ^[Component]                                                                                   | —           |
| suffix-icon                   | 自定义后缀图标                                                                                                                                                      | ^[string] / ^[Component]                                                                                   | —           |
| rows                          | 输入框行数，仅 `type` 为 'textarea' 时有效                                                                                                                              | ^[number]                                                                                                  | 2           |
| autosize                      | textarea 高度是否自适应，仅 `type` 为 'textarea' 时生效。可以接受一个对象，比如: `{ minRows: 2, maxRows: 6 }`                                                                         | ^[boolean] / ^[object]`{ minRows?: number, maxRows?: number }`                                             | false       |
| autocomplete                  | 原生 `autocomplete` 属性                                                                                                                                         | ^[string]                                                                                                  | off         |
| name                          | 等价于原生 input `name` 属性                                                                                                                                        | ^[string]                                                                                                  | —           |
| readonly                      | 原生 `readonly` 属性，是否只读                                                                                                                                        | ^[boolean]                                                                                                 | false       |
| max                           | 原生 `max` 属性，设置最大值                                                                                                                                            | —                                                                                                          | —           |
| min                           | 原生属性，设置最小值                                                                                                                                                   | —                                                                                                          | —           |
| step                          | 原生属性，设置输入字段的合法数字间隔                                                                                                                                           | :::                                                                                                        | —           |
| resize                        | 控制是否能被用户缩放                                                                                                                                                   | ^[enum]`'none' \| 'both' \| 'horizontal' \| 'vertical'`                                                 | —           |
| autofocus                     | 原生属性，自动获取焦点                                                                                                                                                  | ^[boolean]                                                                                                 | false       |
| form                          | 原生属性                                                                                                                                                         | `string`                                                                                                   | —           |
| aria-label ^(a11y) ^(2.7.2)   | 等价于原生 input `aria-label` 属性                                                                                                                                  | ^[string]                                                                                                  | —           |
| tabindex                      | 输入框的 tabindex                                                                                                                                                | ^[string] / ^[number]                                                                                      | —           |
| validate-event                | 输入时是否触发表单的校验                                                                                                                                                 | ^[boolean]                                                                                                 | true        |
| input-style                   | input 元素或 textarea 元素的 style                                                                                                                                 | ^[string] / ^[object]`CSSProperties \| CSSProperties[] \| string[]`                                      | {}          |
| label ^(a11y) ^(deprecated)   | 等价于原生 input `aria-label` 属性                                                                                                                                  | ^[string]                                                                                                  | —           |
| inputmode ^(2.10.3)           | 等价于原生 input ` inputmode ` 属性                                                                                                                                 | ^[string]                                                                                                  | —           |
| count-graphemes ^(2.13.7)     | 自定义函数用于计算字形；设置后，将绕过原生的 `maxlength`/`minlength` 约束。组件使用 `Intl.Segmenter`（Chrome 87+、Firefox 125+、Safari 14.1+）进行正确的字素聚类；旧版浏览器回退到使用 `Array.from()` 进行码点迭代。 | ^[Function]`(value: string) => number`                                                                  | —           |

### Events

| 事件名               | 说明                                     | 类型                                                                                                   |
| ----------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| blur              | 当选择器的输入框失去焦点时触发                        | ^[Function]`(event: FocusEvent) => void`                                                          |
| focus             | 当选择器的输入框获得焦点时触发                        | ^[Function]`(event: FocusEvent) => void`                                                          |
| change            | 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发 | ^[Function]`(value: string \| number, evt?: Event) => void`                                      |
| input             | 在 Input 值改变时触发                         | ^[Function]`(value: string \| number) => void`                                                   |
| clear             | 在点击由 `clearable` 属性生成的清空按钮时触发          | ^[Function]`(evt?: MouseEvent) => void (After version 2.13.4, the evt parameter can be received)` |
| keydown           | 按下键时触发                                 | ^[Function]`(event: KeyboardEvent \| Event) => void`                                             |
| mouseleave        | 当鼠标离开输入元素时触发                           | ^[Function]`(event: MouseEvent) => void`                                                          |
| mouseenter        | 当鼠标进入输入元素时触发                           | ^[Function]`(event: MouseEvent) => void`                                                          |
| compositionstart  | 输入法输入开始时触发                             | ^[Function]`(event: CompositionEvent) => void`                                                    |
| compositionupdate | 输入法输入改变时触发                             | ^[Function]`(event: CompositionEvent) => void`                                                    |
| compositionend    | 输入法输入完成时触发                             | ^[Function]`(event: CompositionEvent) => void`                                                    |

### Slots

| 插槽名                     | 说明                                                                       |
| ----------------------- | ------------------------------------------------------------------------ |
| prefix                  | 输入框头部内容，只对非 `type="textarea"` 有效                                         |
| suffix                  | 输入框尾部内容，只对非 `type="textarea"` 有效                                         |
| prepend                 | 输入框前置内容，只对非 `type="textarea"` 有效                                         |
| append                  | 输入框后置内容，只对非 `type="textarea"` 有效                                         |
| password-icon ^(2.13.6) | 作为输入密码图标的内容，仅在 `show-password` 为 true 时生效。 作用域变量为 `{ visible: boolean }` |

### Exposes

| 名称                        | 说明                      | 类型                                                             |
| ------------------------- | ----------------------- | -------------------------------------------------------------- |
| blur                      | 使 input 失去焦点            | ^[Function]`() => void`                                     |
| clear                     | 清除 input 值              | ^[Function]`() => void`                                     |
| focus                     | 使 input 获取焦点            | ^[Function]`() => void`                                     |
| input                     | Input HTML 元素           | ^[object]`Ref<HTMLInputElement>`                         |
| ref                       | HTML元素 input 或 textarea | ^[object]`Ref<HTMLInputElement \| HTMLTextAreaElement>` |
| resizeTextarea            | 改变 textarea 大小          | ^[Function]`() => void`                                     |
| select                    | 选中 input 中的文字           | ^[Function]`() => void`                                     |
| textarea                  | HTML textarea 元素        | ^[object]`Ref<HTMLTextAreaElement>`                      |
| textareaStyle             | textarea 的样式            | ^[object]`Ref<StyleValue>`                               |
| isComposing ^(2.8.0)      | 是否是输入 composing 状态      | ^[object]`Ref<boolean>`                                  |
| passwordVisible ^(2.13.7) | 密码是否可见                  | ^[object]`Ref<boolean>`                                  |

## 常见问题

#### ElInput 组件的宽度为什么在设置了 `clearable` 时会发生变化

典型问题： [#7287](https://github.com/element-plus/element-plus/issues/7287)

PS: 由于ElInput 组件没有默认宽度，当显示 clearable 图标时, 组件的宽度将被撑开，可以通过设置固定宽度属性来解决。

```vue
<el-input v-model="input" clearable style="width: 200px" />
```
