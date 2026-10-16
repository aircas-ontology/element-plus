---
title: Dropdown 下拉菜单
lang: zh-CN
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

悬停在下拉菜单上以展开更多操作。

:::demo 通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

dropdown/basic-usage

:::

## 位置

支持 6 个位置。

:::demo 设置 ` placement ` 属性，使下拉菜单出现在不同位置。

dropdown/placements

:::

## 触发对象

可使用按钮触发下拉菜单。

:::demo 设置 `split-button` 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为 `true` 即可。如果你想要在第三和第四个选项之间添加一个分隔符，你只需要为第四个选项添加一个 `divided` 的属性。

dropdown/triggering-element

:::

## 触发方式

可以配置点击激活或者悬停激活。

:::demo 将 `trigger` 属性设置为 click 即可，默认为 `hover`。

dropdown/how-to-trigger

:::

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

:::demo 下拉菜单默认在点击菜单项后会被隐藏，将 hide-on-click 属性设置为 false 可以关闭此功能。

dropdown/menu-hiding-behavior

:::

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

:::demo

dropdown/command-event

:::

## 下拉方法

您可以手动使用 `手动打开` 或 `手动关闭下拉菜单以打开或关闭`

:::demo

dropdown/dropdown-methods

:::

## 尺寸

Dropdown 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。

:::demo 使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

dropdown/sizes

:::

## 虚拟触发^(2.11.3)

有时候我们想把 dropdown 的触发元素放在别的地方，而不需要写在一起，这时候就可以使用虚拟触发。

:::demo

dropdown/virtual-trigger

:::

## Dropdown API

### Dropdown Attributes

| 属性名                          | 说明                                                                                                    | 类型                                                                                                                  | Default                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| type                         | 菜单按钮类型，同 `Button` 组件一样，仅在 `split-button` 为 true 的情况下有效。                                               | ^[enum]`'' \| 'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'danger' \| 'text' (deprecated)` | ''                                                                         |
| size                         | 菜单尺寸，在 split-button 为 true 的情况下也对触发按钮生效。                                                              | ^[enum]`'' \| 'large' \| 'default' \| 'small'`                                                                   | ''                                                                         |
| button-props                 | 按钮组件的 props，参考 [按钮属性](./button.html#button-attributes)                                                | ^[object]                                                                                                           | —                                                                          |
| max-height                   | 菜单最大高度                                                                                                | ^[string] / ^[number]                                                                                               | ''                                                                         |
| split-button                 | 下拉触发元素呈现为按钮组                                                                                          | ^[boolean]                                                                                                          | false                                                                      |
| disabled                     | 是否禁用                                                                                                  | ^[boolean]                                                                                                          | false                                                                      |
| placement                    | 菜单弹出位置                                                                                                | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'`                       | bottom                                                                     |
| effect                       | Tooltip 主题，内置了 `dark` / `light` 两种主题                                                                  | ^[enum]`'dark' \| 'light'` / ^[string]                                                                             | light                                                                      |
| trigger                      | 触发下拉的行为                                                                                               | ^[enum]`'click' \| 'hover' \| 'contextmenu'` / ^[array]`Array<'click' \| 'hover' \| 'contextmenu'>`       | hover                                                                      |
| trigger-keys ^(2.9.1)        | 指定键盘上哪些按键可以触发操作                                                                                       | ^[array]`string[]`                                                                                                  | `['Enter', 'Space', 'ArrowDown', 'NumpadEnter']`                           |
| virtual-triggering ^(2.11.3) | 是否启用虚拟触发器                                                                                             | ^[boolean]                                                                                                          | —                                                                          |
| virtual-ref ^(2.11.3)        | 指示下拉框所依附的参考元素                                                                                         | ^[HTMLElement]                                                                                                      | —                                                                          |
| hide-on-click                | 是否在点击菜单项后隐藏菜单                                                                                         | ^[boolean]                                                                                                          | true                                                                       |
| show-arrow ^(2.11.3)         | tooltip 的内容是否有箭头                                                                                      | ^[boolean]                                                                                                          | true                                                                       |
| show-timeout                 | 展开下拉菜单的延时，仅在 trigger 为 hover 时有效                                                                      | ^[number]                                                                                                           | 150                                                                        |
| hide-timeout                 | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）                                                                     | ^[number]                                                                                                           | 150                                                                        |
| role                         | 下拉菜单的 ARIA 属性。根据具体场景，您可能想要将此更改为“navigation”                                                           | ^[enum]`'dialog' \| 'grid' \| 'group' \| 'listbox' \| 'menu' \| 'navigation' \| 'tooltip' \| 'tree'`         | menu                                                                       |
| tabindex                     | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | ^[number] / ^[string]                                                                                               | 0                                                                          |
| popper-class                 | 自定义浮层类名                                                                                               | ^[string] / ^[object]                                                                                               | ''                                                                         |
| popper-style ^(2.11.5)       | 自定义浮层类名                                                                                               | ^[string] / ^[object]                                                                                               | —                                                                          |
| popper-options               | [popper.js](https://popper.js.org/docs/v2/) 参数                                                        | ^[object]                                                                                                           | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| teleported ^(2.2.20)         | 是否将下拉列表插入至 body 元素                                                                                    | ^[boolean]                                                                                                          | true                                                                       |
| append-to ^(2.13.0)          | dropdown 的内容将挂载到哪一个元素上                                                                                | ^[CSSSelector] / ^[HTMLElement]                                                                                     | —                                                                          |
| persistent ^(2.9.5)          | 当下拉菜单处于非活动状态且 `persistent` 为 `false` 时，下拉菜单将被销毁                                                       | ^[boolean]                                                                                                          | true                                                                       |

### Dropdown Slots

| 插槽名      | 说明                                                                                         | 子标签           |
| -------- | ------------------------------------------------------------------------------------------ | ------------- |
| default  | 下拉菜单的内容。注意：必须是有效的 html DOM 元素（例如 `<span>、<button>` 等）或 `el-component`，以附加监听触发器 | :::           |
| dropdown | 下拉列表，通常是 `<el-dropdown-menu>` 组件                                                     | Dropdown-Menu |

### Dropdown Events

| 事件名            | 说明                                               | 类型                                       |
| -------------- | ------------------------------------------------ | ---------------------------------------- |
| click          | `split-button` 为 true 时，点击左侧按钮的回调                | ^[Function]`(e: MouseEvent) => void`  |
| command        | 当下拉项被点击时触发，参数是从下拉菜单中发送的命令                        | ^[Function]`(...args: any[]) => void` |
| visible-change | 当下拉菜单出现/消失时触发器, 当它出现时, 参数将是 `true`, 否则将是 `false` | ^[Function]`(val: boolean) => void`   |

### Dropdown Exposes

| 方法名         | 说明     | Type                       |
| ----------- | ------ | -------------------------- |
| handleOpen  | 打开下拉菜单 | ^[Function]`() => void` |
| handleClose | 关闭下拉菜单 | ^[Function]`() => void` |

## Dropdown-Menu API

### Dropdown-Menu Slots

| 插槽名     | 说明      | 子标签           |
| ------- | ------- | ------------- |
| default | 下拉菜单的内容 | Dropdown-Item |

## Dropdown-Item API

### Dropdown-Item Attributes

| 属性名      | 说明                    | Type                              | 默认值   |
| -------- | --------------------- | --------------------------------- | ----- |
| command  | 派发到`command`回调函数的指令参数 | ^[string] / ^[number] / ^[object] | —     |
| disabled | 是否禁用                  | ^[boolean]                        | false |
| divided  | 是否显示分隔符               | ^[boolean]                        | false |
| icon     | 自定义图标                 | ^[string] / ^[Component]          | —     |

### Dropdown-Item Slots

| 插槽名            | 说明                 |
| -------------- | ------------------ |
| default        | 自定义Dropdown-Item内容 |
| icon ^(2.13.1) | 自定义图标，它将覆盖图标prop   |
