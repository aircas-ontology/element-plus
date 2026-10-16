---
title: Avatar 头像
lang: zh-CN
---

# Avatar 头像

Avatar 组件可以用来代表人物或对象，支持使用图片、图标或者文字作为 Avatar。

## 基础用法

使用 `shape` 和 `size` 属性来设置 Avatar 的形状和大小。

:::demo

avatar/basic

:::

## 展示类型

支持使用图片，图标或者文字作为 Avatar。

:::demo

avatar/types

:::

## 回退行为

图片加载失败时的回退行为。

:::demo

avatar/fallback

:::

## 适应容器

当使用图片作为用户头像时，设置该图片如何在容器中展示。与[ object-fit ](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 属性一致

:::demo

avatar/fit

:::

## 头像组 ^(2.13.1)

显示为头像组

:::demo 使用标签 `<el-avatar-group>` 来分组您的头像。

avatar/group

:::

## Avatar API

### Avatar 属性

| 名称      | 说明                           | 类型                                                                    | 默认值    |
| ------- | ---------------------------- | --------------------------------------------------------------------- | ------ |
| icon    | 设置 Avatar 的图标类型，具体参考 Icon 组件 | ^[string] / ^[Component]                                              | —      |
| size    | Avatar 大小                    | ^[number] / ^[enum]`'large' \| 'default' \| 'small'`                | —      |
| shape   | Avatar 形状                    | ^[enum]`'circle' \| 'square'`                                        | —      |
| src     | Avatar 图片的源地址                | `string`                                                              | —      |
| src-set | 图片 Avatar 的原生 `srcset` 属性    | `string`                                                              | string |
| alt     | 图片 Avatar 的原生 `alt` 属性       | `string`                                                              | —      |
| fit     | 当展示类型为图片的时候，设置图片如何适应容器       | ^[enum]`'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | cover  |

### Avatar 事件

| 名称    | 说明        | 类型                                 |
| ----- | --------- | ---------------------------------- |
| error | 图片加载失败时触发 | ^[Function]`(e: Event) => void` |

### Avatar 插槽

| 插槽名     | 说明        |
| ------- | --------- |
| default | 自定义头像展示内容 |

## AvatarGroup API ^(2.13.1)

### AvatarGroup Attributes

| 方法名                      | 详情                                                           | Type                                                                                                                                                                                   | 默认    |
| ------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| size                     | 控制头像组中的头像大小                                                  | ^[number] / ^[enum]`'large' \| 'default' \| 'small'`                                                                                                                                 | —     |
| shape                    | 控制头像组中的头像形状                                                  | ^[enum]`'circle' \| 'square'`                                                                                                                                                         | —     |
| collapse-avatars         | 是否折叠头像                                                       | ^[boolean]                                                                                                                                                                             | false |
| collapse-avatars-tooltip | 是否在鼠标悬停折叠头像的文字时显示所有折叠头像。若要使用此功能， `collapse-avatars` 必须为 true | ^[boolean]                                                                                                                                                                             | false |
| max-collapse-avatars     | 需要显示的头像的最大数量若要使用此功能， `collapse-avatars` 必须为 true             | ^[number]                                                                                                                                                                              | 1     |
| effect                   | tooltip 主题，内置了 `dark` / `light` 两种                           | ^[enum]`'dark' \| 'light'` / ^[string]                                                                                                                                                | light |
| placement                | tooltip 的位置                                                  | ^[enum]`'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | top   |
| popper-class             | tooltip 的自定义类名                                               | ^[string]                                                                                                                                                                              | ''    |
| popper-style             | tooltip 的自定义样式                                               | ^[string] / ^[object]                                                                                                                                                                  | —     |
| collapse-class           | collapse-avatar 的自定义类名                                       | ^[string]                                                                                                                                                                              | ''    |
| collapse-style           | collapse-avatar 的自定义样式                                       | ^[string] / ^[object]                                                                                                                                                                  | —     |
