---
title: 自定义默认值
lang: zh-CN
---

# 自定义默认值

组件库允许您自定义组件属性的默认值。

通过提前配置默认值，您可以减少重复的prop声明并保持模板更干净和更一致。

## 基础用法

您可以使用组件提供的静态`setPropsDefaults`方法自定义组件的属性默认值。

:::tip

请注意，默认自定义**仅适用于声明式组件** 并且 **必须在组件初始化之前执行**。

配置的默认值是全局的。一旦设置，它们将应用于注册了该组件的所有Vue应用程序。

组件首次渲染后，其默认值将变为不可变，无法再更改。

:::

```ts [main.ts]
import { ElButton } from 'element-plus'

ElButton.setPropsDefaults({
  type: 'primary',
  size: 'small',
})
```

应用自定义设置后，以下两种用法等效：

```vue [App.vue]
<template>
  <el-button>Hello</el-button>
  <el-button type="primary" size="small">Hello</el-button>
</template>
```

::: warning

不建议为其他组件内部使用的组件设置默认值。

例如：

```ts
// 这将导致 el-autocomplete 组件的行为发生改变。
ElInput.setPropsDefaults({ maxlength: 1 })
```

:::
