---
title: InputOtp 一次性密码输入框
lang: zh-CN
---

# InputOtp 一次性密码输入框 ^(beta)

用于输入一次性密码

## 基础用法

:::demo

input-otp/basic

:::

## 自定义长度

输入字段长度可以通过设置`length`属性来自定义。

:::demo

input-otp/custom-length

:::

## 展示类型

有三种类型可用：`outlined ` （默认）、`filled ` 和 `underlined`。

:::demo

input-otp/types

:::

## 调整尺寸

有三个尺寸可用：`large`、`default` 和 `small`。

:::demo

input-otp/sizes

:::

## 禁用 & 只读

支持禁用和只读状态。

:::demo

input-otp/disabled

:::

## 密码模式

使用 `mask` 属性来隐藏输入字符。

:::demo

input-otp/mask

:::

## 分隔符

自定义OTP字段之间的分隔符。

:::demo

input-otp/separator

:::

## 自定义验证

设置 `validator` 属性以验证输入字符，并使用 `inputmode` 指定键盘类型。

:::demo

input-otp/validator

:::

## 应用开发接口（API）

### 属性

| 插槽名                                   | 详情                                            | 事件参数                                                                                                                                                                                                                  | 默认值                                                 |
| ------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| model-value / v-model                 | OTP字段的值。由于数字不能有前导零，`modelValue` 仅在初始化期间允许为数字。 | ^[string] / ^[number]                                                                                         | undefined                                           |
| length                                | OTP字段长度                                       | ^[number]                                                                                                                                                         | 6                                                   |
| validator                             | 自定义验证函数                                       | ^[Function]`(char: string, index: number) => boolean`                                                                                                             | () => true                       |
| inputmode                             | 原生 `inputmode` 属性                             | ^[string]                                                                                                                                                         | —                                                   |
| type                                  | OTP字段类型                                       | ^[enum]`'outlined' \| 'filled' \| 'underlined'`                                                                                                                   | 'outlined'                                          |
| size                                  | OTP字段的尺寸                                      | ^[enum]`'large' \| 'default' \| 'small'`                                                                                                                          | ::: |
| mask                                  | 是否启用密码模式                                      | ^[boolean]                                                                                                                                                        | —                                                   |
| disabled                              | 是否禁用OTP字段                                     | ^[boolean]                                                                                                                                                        | undefined                                           |
| separator                             | OTP字段之间的分隔符                                   | ^[string] / ^[VNode] / ^[Function]`() => string \| VNode` | —                                                   |
| validate-event                        | 是否触发表单验证                                      | ^[boolean]                                                                                                                                                        | true                                                |
| readonly                              | 与原生输入中的 `readonly` 相同                         | ^[boolean]                                                                                                                                                        | false                                               |
| id                                    | 原生 `id` 属性                                    | ^[string]                                                                                                                                                         | —                                                   |
| aria-label ^(a11y) | 原生 `aria-label` 属性                            | ^[string]                                                                                                                                                         | —                                                   |

### Events

| 方法名                               | 说明                 | 类型                                                                                           |
| --------------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| update:modelValue | 值更新时触发             | ^[Function]`(value: string) => void`     |
| change                            | 当输入框失去焦点后且值发生变化时触发 | ^[Function]`(value: string) => void`     |
| finish                            | 当所有字段都已填写时触发       | ^[Function]`(value: string) => void`     |
| focus                             | 输入框获得焦点时触发         | ^[Function]`(event: FocusEvent) => void` |
| blur                              | 输入框失去焦点时触发         | ^[Function]`(event: FocusEvent) => void` |

### 插槽

| 方法名       | 详情           | 事件参数                                                                             |
| --------- | ------------ | -------------------------------------------------------------------------------- |
| separator | OTP 字段之间的分隔符 | ^[object]`{ index: number }` |

### 对外暴露的方法

| 名称        | 详情           | 类型                                                                                                    |
| --------- | ------------ | ----------------------------------------------------------------------------------------------------- |
| inputRefs | HTML 输入框元素数组 | ^[object]`Ref<(HTMLInputElement \| undefined)[]>` |
| focus     | 聚焦OTP输入字段    | ^[Function]`(index?: number) => void`             |
| blur      | 失焦OTP输入字段    | ^[Function]`() => void`                           |
