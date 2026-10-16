# How To Contribute

## Opening Issues

- Before opening an issue, please search for the keyword to see whether the issue you encountered has already been reported. :pray:

- Issues should be opened via [Issue Template](https://issue.element-plus.org/), and the form should be filled with sufficient information to reproduce the issue, so that our developers can help you verify and fix it.

**Issues with insufficient information WILL BE CLOSED directly because we cannot reproduce them.**

- Issues with feature requests should be submitted to [RFCs](https://github.com/element-plus/rfcs/issues). This helps us manage feature requests more efficiently.

Next section is for those who wants to help develop Element Plus.

## Prerequisites

You should have:

Node.js >= 22.13.0

pnpm >= 11

Git > 2.20

Some of our compiled code relies on features introduced in Node.js >= 22.13.0, so you will need to install that version or a newer one.

## Clone the Repository

1. Click the fork button on the top right of [the repository homepage](https://github.com/element-plus/element-plus).
2. Download the project to your machine.
3. Run commands below to bootstrap this project.

```shell
cd $THE_PROJECT_PATH_YOU_DOWNLOADED
# If you haven't installed yet
pnpm install
```

## Verify Installation

Then you can run the following commands to verify your installation.

```shell
pnpm t
pnpm format
```

## Getting Started Developing

Now that you have installed the code correctly, you can choose:

### Modify and update the documentation site

```shell
# If you would like to modify the website source code of https://element-plus.org
# It is made with [VitePress](https://vitepress.vuejs.org)
pnpm docs:gen-locale # This generates locale files for your local development
pnpm docs:dev
```

### 本地中文文档

本地文档默认使用简体中文。首次访问 `http://localhost:2000/` 会进入中文首页；
语言菜单可切换中文和 English，并记住选择。直接访问 `/en-US/` 可浏览英文。

```shell
# 一次性下载或更新官方中文正文，需要 Git 和网络
pnpm docs:sync-zh
# 启动不联网同步翻译
pnpm docs:dev
```

中文正文来自 [官方 docs-i18n 仓库](https://github.com/element-plus/docs-i18n) 的
`main` 分支，由官方发布流程同步；同步命令会输出来源提交及新增、更新数量。
当前导入来源为 `d160b21`（官方标记为 2.14.7），翻译可能落后于开发分支。

同步会覆盖同路径的中文 Markdown。`docs/zh-CN/` 存在未提交改动（包括新文件）时，
请先提交或暂存到 stash，再同步。远端移除的页面仅报告，保留本地文件；
本地英文页面缺少官方翻译时，自动添加带「待翻译」提示的英文正文补位。
下载或校验失败不会覆盖本地文档。

导航、侧边栏等中文界面配置位于 `docs/.vitepress/crowdin/zh-CN/`，
属于本地补充翻译，不由正文同步命令覆盖。命令会报告与英文配置的结构差异，
成功同步后自动生成 `.vitepress/i18n/`，无需手动修改生成文件。

### Making Changes to the Component Instead of the Website

```shell
# If you would like to run a local playground to test out your changes against
# Some specific component
pnpm dev
```

You can follow the [LOCAL DEVELOPMENT GUIDE](https://element-plus.org/en-US/guide/dev-guide.html) to do development more quickly.

### Compile the Source Code

If you would like to compile this project locally:

```shell
# This one line code would start compiling the code which was published to https://npmjs.com
pnpm build
```

### Compile Documentation Website

If you would like to compile the website code locally:

```shell
pnpm docs:build
```

## Pull Requests

After completing your coding tasks, please note:

1. Update the tests to cover all cases.
2. Update the corresponding documentation if you are making changes to the API.
3. Write a comprehensive commit message.
4. Push your local changes to your remote, and then submit a pull request to the upstream.
5. In the description section, you can add more information about your changes, to help the reviewers for better
   understanding the context here.

## Documentation Formatting Guidelines

When updating documentation API tables, keep descriptions consistent:

1. Keep attribute and prop names lowercase.
2. Start API descriptions with an uppercase letter.
3. Preserve code terms wrapped in backticks, such as `slot`, `Tooltip`, and `Popover`.
4. Avoid broad reformatting changes unrelated to the current documentation update.

## Commit Template

We have prepared a commit message template for you to refer to, you can also follow the instructions of the CLI tool to generate
commit message intuitively.

1. With command

```bash
pnpm cz
```

2. You can also write the commit message manually, but make sure your
   commit message follows the rules.

We have a [commit template](https://element-plus.org/en-US/guide/commit-examples.html)

NOTE:
**PRs with unformatted commit messages WILL NOT BE ACCEPTED.**

That's all, thanks for your contribution! 🤩
