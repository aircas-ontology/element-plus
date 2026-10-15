# @styles/element-plus-theme

基于设计参考图的深蓝 / 青色 Element Plus 主题。支持原生 Element Plus 属性、事件、插槽、表单验证与键盘操作，不修改组件源代码。

## 安装

```sh
npm install vue element-plus ./styles-element-plus-theme-1.0.0.tgz
```

```js
import { createApp } from 'vue'
import StylesTheme from '@styles/element-plus-theme'
import App from './App.vue'

createApp(App).use(StylesTheme).mount('#app')
```

默认启用深色主题、中文与 small 尺寸；使用 `app.use(StylesTheme, { size: 'default' })` 可调整尺寸。

```vue
<template>
  <UiPanel title="规则列表">
    <el-button type="primary">创建规则</el-button>
    <UiStatus type="success" label="运行正常" />
  </UiPanel>
</template>
```

## 已有 Element Plus 项目仅接入样式

在 Element Plus 基础样式与 dark 变量样式之后导入：

```js
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@styles/element-plus-theme/theme.css'
document.documentElement.classList.add('dark', 'styles-theme')
```

主题作用于 `html.styles-theme`，覆盖 body 中的下拉菜单、日期面板、弹窗等 teleport 节点。要离开主题移除 `styles-theme` 类；若恢复浅色，也需移除 `dark` 类。

## 设计变量

```css
html.styles-theme {
  --ui-primary: #126681;
  --ui-accent: #00c4e5;
  --ui-bg: #000e24;
}
```

组件语义色阶已预先定义；若更换整套色板，也请更新 `--el-color-*-light-*` 等变量。基础控件为 28px、12px 字号、2px 圆角，卡片为 4px 圆角。

`tokens` 导出设计变量；`componentCoverage` 区分参考图组件与按同一规则扩展的组件。主题支持 Element Plus 2.14.7 及其兼容版本。
