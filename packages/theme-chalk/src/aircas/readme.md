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

## Dark 配色精简与回归确认

本轮仅调整 `:root.dark`。Light 的固定色、状态生成方式及原有保护规则不变；字号、尺寸、间距、圆角和阴影不变。颜色只使用原生 `--el-*` 变量，不建立第二套 `--aircas-color-*`。

### 已确认的颜色

以下为 31 个固定色值；组件通过全局变量复用颜色，设计值不散落在组件文件中。

| 用途                                                               | 固定色值                                              |
| ------------------------------------------------------------------ | ----------------------------------------------------- |
| primary / success / warning                                        | `#126681` / `#21D36A` / `#E2C626`                     |
| danger / info                                                      | `#EB5058` / `#9CACBF`                                 |
| Dialog、MessageBox 标题及 Table 表头                               | `#0E5C78`                                             |
| primary 按钮 hover / active、通用选中背景                          | `#197F9E` / `#093D7E`                                 |
| 焦点、选中边框                                                     | `#00C4E5`                                             |
| 页面 / 组件 / 浮层背景                                             | `#000E24` / `#00122C` / `#001630`                     |
| 通用填充 / hover 背景                                              | `#092741` / `#0A2D48`                                 |
| 默认 / 次级 / 弱化边框                                             | `#2187A8` / `#124769` / `#073052`                     |
| 主要 / 常规文字                                                    | `#E1EAF3` / `#C4D1DE`                                 |
| 次要 / 占位 / 禁用文字                                             | `#8B9FB5` / `#7890A8` / `#596F86`                     |
| 白 / 黑                                                            | `#FFFFFF` / `#000000`                                 |
| InputNumber 原有亮灰禁用背景 / 边框 / 文字                         | `#2B3E52` / `#526170` / `#9AA7B5`                     |
| overlay / overlay-light、mask / overlay-lighter / mask-extra-light | `#000714CC` / `#000714B8` / `#00071480` / `#00071466` |

五类语义色的 30 个状态阶按 Element Plus 暗色规则派生：`light-3/5/7/8/9` 向 `#00122C` 分别混入 30%/50%/70%/80%/90%，`dark-2` 向白色混入 20%，RGB 逐通道四舍五入。整数百分比计算避免半通道的浮点误差，保证确认色板中的 danger light-9 为 `#181830`。`error`、RGB 和状态阶引用 `danger`，不维护重复色表。此处的 light/dark 后缀沿用官方变量名称；暗色主题的 light 色阶实际逐步接近暗背景。

### 状态与覆盖保留原因

- 实心按钮默认背景直接继承五类语义主色。primary 保留白字、专用 hover/active；其余类型使用黑字、hover 为 `dark-2`、active 为 `light-3`，danger active 使用白字。plain/text/link/dashed 保留原生变体行为，仅修正必要文字对比和键盘焦点。
- `fill-color-light` 和 `fill-color-dark` 统一为 `#0A2D48`，供下拉、树节点、时间列表及表格行继承。`fill-color-darker` 为 `#093D7E`，用于选中背景；默认边框为 `#2187A8`，焦点及交互边框为 `#00C4E5`。
- Dialog、MessageBox 没有原生标题背景变量，保留铺满标题区域所需的背景、间距和关闭按钮避让规则。
- Alert 亮色语义的 dark effect 使用黑色内容文字；关闭图标复用黑色阴影保留轮廓，避免 danger hover 在 error 背景上消失，不增加按钮背景或新颜色。
- Table 当前行在 hover、条纹和固定列组合下保留选中背景；普通行仍使用统一 hover 色。
- 关闭控件集中在 `close.scss`：Dialog、MessageBox、Drawer、Notification、Message、Alert、Tour 使用透明背景、浅色默认图标、danger hover/focus 渐变及可见键盘焦点；遵守 reduced-motion 偏好。
- TreeSelect 内部 option 被官方设为透明背景，因此只对选中 option 的父行补背景；普通 hover 继承全局填充。Tree 禁用节点不响应 hover/focus 填充。

| 保留的组件覆盖                                              | 原因                                                            |
| ----------------------------------------------------------- | --------------------------------------------------------------- |
| Button、Input、Select                                       | 既有尺寸及 Light 背景保护；深色主色下的文字、焦点和按钮状态适配 |
| RadioButton、Checkbox、Radio、Switch、Slider                | 局部原生变量、原生直接颜色规则与选中/焦点对比                   |
| Table                                                       | 原有 Light 保护，Dark 表头、当前行和不干扰 hover 的条纹         |
| Tree、Cascader、Dropdown、DatePicker、Calendar              | 局部初始化或原生只改字色的状态；区别选中、hover、禁用           |
| Dialog、MessageBox、Close                                   | 标题区域无原生背景变量；统一右上角关闭控件状态                  |
| Popper、Popover                                             | dark effect 原生反色及箭头边框的最小例外                        |
| InputNumber                                                 | 保留原有亮灰禁用表现；增减控件原生直接样式的适配                |
| Form                                                        | 校验错误边框优先于 cyan focus，标签颜色沿用原有表现             |
| Alert、Message、Notification、Tour                          | 内容文字对比、局部关闭变量及浮层背景初始化                      |
| Anchor、Backtop、Breadcrumb、Collapse、Link、Loading、Steps | 原生 primary 用于文字或指示器时过暗，需要复用 cyan              |
| Menu、Pagination、Segmented、Tabs、Tag、Upload              | 局部原生变量或原生直接颜色规则，保证交互与选中对比              |

已删除 Avatar、Card、Descriptions、Drawer、Progress、Scrollbar、Skeleton、Timeline、Transfer 的独立覆盖文件及入口导入。Drawer 关闭控件由 `close.scss` 统一处理，其余恢复原生变量继承。其余组件中重复的 hover/disabled 色、暗按钮填充、特殊 info 色和无必要的背景/边框覆盖也已移除。

### 验证

自动化测试真实编译「官方组件 CSS → 官方 dark CSS → Aircas」，再用本仓库已有 Puppeteer/Chrome 检查实际计算样式及鼠标、键盘状态，不修改官方 Demo。浏览器需已安装；测试需具备启动本地 Chrome 的权限。

```bash
pnpm exec vitest run packages/theme-chalk/src/aircas/__tests__/theme.test.ts
pnpm build:theme
pnpm docs:build
pnpm docs:dev
```

若完整 docs 构建触及 Node 默认堆上限，可只为该命令提高堆内存，不需要改项目配置：

```bash
NODE_OPTIONS=--max-old-space-size=8192 pnpm docs:build
```

`build:theme` 不生成独立 Aircas CSS；独立接入继续沿用本文“方式一”或“方式二”。主题源码只依赖 Sass 内置模块，复制整个目录仍可独立编译。

运行 `pnpm docs:dev` 后使用终端实际地址（2000 被占用时会自动递增），通过页面现有开关切换 Dark，并重点回归：

| 组件                                                  | 检查内容                                                                       |
| ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| Button、Link                                          | 实心/plain/text/link/dashed；默认、hover、active、disabled、loading 和键盘焦点 |
| Input、Select、SelectV2、TreeSelect、Form             | cyan focus、错误叠加、hover、selected、多选勾号、disabled                      |
| Table、TableV2                                        | 表头、条纹、hover、当前行、固定列及内嵌控件                                    |
| DatePicker、DateTimePicker、TimePicker、Cascader      | 日/月/年、今天、范围、选中端点、hover、disabled 和 body 弹层                   |
| Dialog、MessageBox、Drawer                            | 标题背景、正文、关闭图标的默认/hover/focus、透明按钮背景和遮罩                 |
| Notification、Message、Alert、Tour                    | 右上角关闭控件、不同 effect 和语义内容文字                                     |
| Checkbox、Radio、Switch、Tree、Menu、Tabs、Pagination | 选中、hover、disabled 与键盘焦点                                               |
| Tooltip、Popover、Dropdown                            | dark/light effect、箭头和浮层边框一致                                          |

最后通过现有开关切回 Light，复查 Button、Input、Select、Table、Dialog，然后再次切回 Dark。检查最终 diff 仅包含本目录文件，不提交 docs 的生成文件或独立编译输出。
