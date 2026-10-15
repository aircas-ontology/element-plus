# AirCAS Theme 开发与接入

AirCAS Theme 是覆盖在 Element Plus 官方样式之上的主题。颜色直接覆盖 Element Plus 已有的 `--el-*` CSS 变量，让组件沿用官方样式及状态继承。字号、尺寸、间距、圆角和阴影保留原有 `--aircas-*` Token，通过 `variables.scss` 适配。只有根颜色变量无法表达的差异才放在 `components/` 中。

当前阶段的统一入口是 [`index.scss`](./index.scss)。仓库中的官方 docs 已在 `docs/.vitepress/vitepress/index.ts` 中按「Element Plus 官方样式 → 官方暗色变量 → AirCAS Theme」的顺序全局导入它。

## 在本仓库启动与验证

在仓库根目录安装依赖后运行：

```bash
pnpm install
pnpm docs:dev
```

打开终端显示的本地地址（默认 `http://localhost:2000/`），进入官方组件文档。使用页面右上角现有的暗色开关检查 Light / Dark；无需修改或复制官方 Demo。修改 `common/` 中的 Token 或 `themes/` 中的主题值后，VitePress 会通过 HMR 更新页面。

重点检查 Button、Input、Select、Table 和 Dialog，并抽查 Checkbox、Radio、Switch、Pagination、Tabs、Tag、Alert、Progress、Drawer、Tooltip、Popover、DatePicker、Tree、Menu、Dropdown、Message、Notification。两套主题都要检查默认、悬停、激活、焦点、禁用、选中、加载、错误、成功、空状态及弹层。遇到异常时先检查原生 `--el-*` 变量的值、声明位置和继承关系，再考虑组件覆盖。

提交前至少运行：

```bash
pnpm build:theme
pnpm docs:build
```

`build:theme` 目前只编译 `packages/theme-chalk/src/*.scss` 和官方暗色入口，**不会生成独立的 AirCAS CSS 文件**；AirCAS 的 Sass 编译和 docs 集成由 `docs:dev`、`docs:build` 验证。`build:theme` 用于确认原有主题构建未受影响。

## 修改流程与规范

| 层级         | 文件                                    | 职责                                                             |
| ------------ | --------------------------------------- | ---------------------------------------------------------------- |
| 通用颜色     | `common/_color.scss`                    | 按 Element Plus 原生变量命名维护 `$light`、`$dark` 及状态色阶    |
| 特殊颜色     | `common/_color-special.scss`            | 只维护必要组件例外的颜色；优先使用已有组件变量的后缀命名         |
| 其他 Token   | `common/_*.scss`                        | 保留字号、尺寸、间距、圆角和阴影                                 |
| Light / Dark | `themes/light.scss`、`themes/dark.scss` | 在 `:root:not(.dark)`、`:root.dark` 输出原生颜色变量及其他 Token |
| 变量适配     | `variables.scss`                        | 仅适配已有非颜色 Token，不建立第二套颜色映射                     |
| 组件例外     | `components/*.scss`                     | 只处理局部原生变量或无变量可用的差异，注明保留原因               |
| 统一入口     | `index.scss`                            | 控制以上各层的加载顺序                                           |

1. 配色优先修改 `common/_color.scss` 的 `$light`、`$dark`。键名直接对应原生变量后缀，例如 `color-primary` 输出 `--el-color-primary`，`bg-color-page` 输出 `--el-bg-color-page`。不额外创建 `--aircas-color-*` 别名；状态色 RGB 和 error/danger 别名统一生成。特殊颜色仅放在 `_color-special.scss`，设计值不要散落在组件文件中。
2. 若 Element Plus 组件未继承主题，先查 `packages/theme-chalk/src/var.scss`、`dark/css-vars.scss`、`common/var.scss` 和该组件的 SCSS，确认其实际 CSS 变量及声明位置。根变量可处理的修改留在 `_color.scss`；组件元素会重新初始化的局部变量，才在对应组件文件中覆盖同名原生变量。
3. 只有变量映射无法解决时才在 `components/` 中写最小覆盖；不要复制官方组件 SCSS，也不要修改 `packages/components/**` 的逻辑、Props、DOM 或事件。
4. 在官方 docs 中检查 Light / Dark 和交互状态，确认 Token 改动可通过 HMR 反映到组件。保持 Sass `@use` 写法，只改与主题相关的文件。

docs 的开关给 `<html>` 添加或移除 `.dark`。AirCAS 不使用 `theme="light"` / `theme="dark"` 属性；新项目也应沿用同一 `.dark` 状态。

## 应用到通过 npm 安装 Element Plus 的新项目

**当前不能只通过 `npm install element-plus` 获得 AirCAS Theme。**官方 npm 包提供 Element Plus 样式，但 AirCAS 源码目前只在此分支中，也没有独立发布的 npm 包或由 `build:theme` 生成的 AirCAS CSS。需要把 AirCAS 样式作为项目资源引入；以下两种方式任选其一。

### 方式一：编译并复制一份 CSS

先确保新项目的 `src/styles/` 目录存在，再在本仓库根目录执行（目标路径改为新项目的实际路径）：

```bash
packages/theme-chalk/node_modules/.bin/sass --no-source-map \
  packages/theme-chalk/src/aircas/index.scss \
  /path/to/new-project/src/styles/aircas-theme.css
```

此命令只编译 AirCAS 覆盖层，不包含 Element Plus 官方组件 CSS。然后在新项目的入口（以 Vite + Vue 的 `src/main.ts` 为例）按顺序导入：

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/aircas-theme.css'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
```

这是无需在新项目安装 Sass 的接入方式。后续修改 AirCAS Token 时，重新编译并替换该 CSS 文件。

### 方式二：复制源码，由新项目编译 SCSS

将本目录完整复制到新项目的 `src/styles/aircas/`，安装项目构建工具支持的 Sass 实现（Vite 项目可用 `npm install -D sass-embedded`）。入口改为最后导入 `./styles/aircas/index.scss`：

```ts
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/aircas/index.scss'
```

这种方式可以直接修改新项目中的 AirCAS Token，并使用项目的样式 HMR。复制时保留整个目录和相对路径；不要只复制 `index.scss`。

两种方式都用 `<html class="dark">` 启用暗色，移除 `dark` 类恢复浅色。例如：

```ts
function setDarkMode(enabled: boolean) {
  document.documentElement.classList.toggle('dark', enabled)
}
```

**接入检查：**确认最终加载顺序为官方组件 CSS → 官方 dark 变量 CSS → AirCAS 覆盖层；检查 Button 主色、Input 焦点、Select 弹层、Table 表头与行、Dialog 遮罩在 Light / Dark 下的表现。若项目使用按需自动导入组件 CSS，也要确认这些样式没有在 AirCAS 之后覆盖它。适配层依据本仓库当前 Element Plus 源码编写；外部项目升级 Element Plus 版本时，应重新核对实际 `--el-*` 变量并回归验证组件状态。

## Dark v2 配色与回归确认

暗色使用海军蓝表面与青色交互主色，仅在 `:root.dark` 生效。Light 的视觉颜色及原有字号、尺寸、间距、圆角和布局保持原样。

- `--el-color-primary: #00c4e5` 是统一交互主色，供 Input/Select 焦点、链接、选中提示、Tabs、Menu、Loading 等通过官方样式继承。
- `--el-bg-color-page`、`--el-bg-color`、`--el-bg-color-overlay` 分别为 `#000e24`、`#00122c`、`#001630`。
- 深青 `#126681` 只用于实心主按钮的 `--el-button-bg-color`。实心语义按钮采用较暗的填充，使原生浅色文字可读；不改变全局语义色。plain 按钮亮色悬停时，仅用原生文字变量调整对比度。
- 不再逐组件复刻参考包中的细节。其余组件沿用官方背景、悬停、选中、禁用、校验和浮层样式。

本目录仅保留以下组件文件，每项都有明确原因：

| 文件                              | 保留原因                                                                         |
| --------------------------------- | -------------------------------------------------------------------------------- |
| `button.scss`                     | 保留旧尺寸；按钮在自身声明原生变量，需通过同名局部变量区分实心填充与全局交互主色 |
| `input.scss`                      | 保留旧尺寸及 Light 输入背景（含深色浮层内），Dark 颜色继承官方变量               |
| `select.scss`                     | 仅保留旧尺寸与已有 Light 背景；Dark 沿用原生颜色和状态                           |
| `table.scss`                      | 保留已有 Light 表现；Dark 仅覆盖原生表头背景、文字变量，正文和各状态继续继承     |
| `dialog.scss`、`message-box.scss` | 官方没有标题区域背景变量，仅补蓝色标题背景                                       |
| `popper.scss`                     | 默认 dark effect 使用反色方案；深蓝底浅字需最小例外，背景及箭头仍共用原生变量    |

主题不依赖参考目录或其安装插件，不引入业务专用 class。继续沿用原有样式加载顺序与 `.dark` 开关。

运行 `pnpm docs:dev` 后，优先检查：

| 组件                                                          | 确认内容                                                                  |
| ------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Button、Link                                                  | 实心/plain/text/link/dashed；悬停、按下、禁用、加载、键盘焦点及文字可读性 |
| Input、Select、Form、InputOtp                                 | 原生青色焦点；错误红边与聚焦叠加；禁用状态；下拉选项及多选                |
| Table、Table V2                                               | 蓝色表头；官方正文、条纹、行悬停、当前行与固定列                          |
| Dialog、MessageBox、Drawer                                    | 标题背景、正文、关闭按钮、遮罩与 body 弹层                                |
| DatePicker、TimePicker、Cascader                              | 原生选中、今天、范围、禁用及浮层                                          |
| Checkbox、Radio、Switch、Menu、Tree、Tabs、Pagination         | 确认无需组件覆盖即可继承新主题，检查选中、禁用与键盘焦点                  |
| Tooltip、Popover、Dropdown、Tag、Alert、Message、Notification | 浮层箭头一致、各 effect 与语义类型的原生表现                              |

最后切回 Light，复查 Button、Input、Select、Table、Dialog。

```bash
pnpm exec vitest run packages/theme-chalk/src/aircas/__tests__/theme.test.ts
pnpm build:theme
pnpm docs:build
```

`build:theme` 不生成独立 AirCAS CSS，独立接入沿用本文“方式一”或“方式二”。
