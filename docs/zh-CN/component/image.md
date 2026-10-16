---
title: Image 图片
lang: zh-CN
---

# Image 图片

图片容器，在保留所有原生 img 的特性下，支持懒加载，自定义占位、加载失败等

## 基础用法

:::demo 可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

image/basic-usage

:::

## 占位内容

:::demo 可通过`slot = placeholder`可自定义占位内容

image/placeholder

:::

## 加载失败

:::demo 通过 `slot = error` and `slot = viewer-error`自定义图像加载错误时的内容。

image/load-failed

:::

## 懒加载

:::tip

浏览器原生支持的 `loading`属性在 <VersionTag version="2.2.3" />版本加入。 您可以使用 `loading="lazy"` 替换之前的`lazy= true`。

如果当前浏览器支持原生图片延迟加载，则先使用原生能力，否则将使用滚动监听实现相同效果。

:::

:::demo 可通过`lazy`开启懒加载功能，当图片滚动到可视范围内才会加载。可通过 `scroll-container` 来设置滚动容器，若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素。

image/lazy-load

:::

## 图片预览

:::demo 可通过 `previewSrcList` 开启预览大图的功能。你可以通过 `initial-index` 初始化第一张预览图片的位置。默认初始位置为 0。

image/image-preview

:::

## 手动打开预览 ^(2.9.4)

:::demo

image/manually-preview

:::

## 自定义工具栏^(2.9.4)

:::demo 可通过 `toolbar` 插槽自定义工具栏内容，自版本 ^(2.9.7) 起，插槽中添加了 `setActiveItem` 方法，用于根据索引切换图片。

image/custom-toolbar

:::

## 自定义进度条 ^(2.9.4)

:::demo 可通过 `show-progress` 控制是否在预览图片时显示进度条。自版本 ^(2.9.8) 起，进度条会在使用 `progress` 插槽时显示。

image/custom-progress

:::

## Image API

### Image Attributes

| 属性名                    | 说明                                                                                                       | 类型                                                                           | 默认值   |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----- |
| src                    | 图片源地址，同原生属性一致                                                                                            | ^[string]                                                                    | ''    |
| fit                    | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)                | ^[enum]`'' \| 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | ''    |
| hide-on-click-modal    | 当开启 preview 功能时，是否可以通过点击遮罩层关闭 preview                                                                    | ^[boolean]                                                                   | false |
| loading ^(2.2.3)       | 浏览器加载图像的策略，和 [浏览器原生](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)能力一致     | ^[enum]`'eager' \| 'lazy'`                                                  | —     |
| lazy                   | 是否使用懒加载                                                                                                  | ^[boolean]                                                                   | false |
| scroll-container       | 开启懒加载功能后，监听 scroll 事件的容器默认情况下，开启懒加载功能后，监听 scroll 事件的容器                                                   | ^[string] / ^[object]`HTMLElement`                                           | —     |
| alt                    | 原生属性 `alt`                                                                                               | ^[string]                                                                    | —     |
| referrerpolicy         | 原生属性 [referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy)。 | ^[string]                                                                    | —     |
| crossorigin            | 原生属性 [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin)             | ^[enum]`'' \| 'anonymous' \| 'use-credentials'`                            | —     |
| preview-src-list       | 开启图片预览功能                                                                                                 | ^[array]`string[]`                                                           | []    |
| z-index                | 设置图片预览的 z-index                                                                                          | ^[number]                                                                    | —     |
| initial-index          | 初始预览图像索引，小于 `url-list` 的长度                                                                               | ^[number]                                                                    | 0     |
| close-on-press-escape  | 是否可以通过按下 ESC 关闭 Image Viewer                                                                             | ^[boolean]                                                                   | true  |
| preview-teleported     | image-viewer 是否插入至 body 元素上。嵌套的父元素属性会发生修改时应该将此属性设置为 `true`                                               | ^[boolean]                                                                   | false |
| infinite               | 是否可以无限循环预览                                                                                               | ^[boolean]                                                                   | true  |
| zoom-rate              | 图像查看器缩放事件的缩放速率。                                                                                          | ^[number]                                                                    | 1.2   |
| scale ^(2.11.3)        | 预览图像缩放。                                                                                                  | ^[number]                                                                    | 1     |
| min-scale ^(2.4.0)     | 图像查看器缩放事件的最小缩放比例                                                                                         | ^[number]                                                                    | 0.2   |
| max-scale ^(2.4.0)     | 图像查看器缩放事件的最大缩放比例                                                                                         | ^[number]                                                                    | 7     |
| show-progress ^(2.9.4) | 是否在预览图片时显示进度条                                                                                            | ^[boolean]                                                                   | false |

### Image Events

| 事件名    | 说明                                                 | 类型                                      |
| ------ | -------------------------------------------------- | --------------------------------------- |
| load   | 图片加载成功触发                                           | ^[Function]`(e: Event) => void`      |
| error  | 图片加载失败触发                                           | ^[Function]`(e: Event) => void`      |
| switch | 切换图像时触发。                                           | ^[Function]`(index: number) => void` |
| close  | 当点击 X 按钮或者在` hide-on-click-modal `为 true 时点击遮罩层时触发 | ^[Function]`() => void`              |
| show   | 当 Viewer 显示时触发                                     | ^[Function]`() => void`              |

### Image Slots

| 插槽名                                                                | 说明                                                                                      | 类型 |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | -- |
| placeholder                                                        | 当图像尚未加载时，自定义的占位符内容                                                                      | -  |
| error                                                              | 自定义图像加载失败的内容                                                                            | -  |
| viewer                                                             | 当图像预览时自定义内容                                                                             | -  |
| [\[image viewer slots\](#image-viewer-slots)](#image-viewer-slots) | when you allow big image preview, image viewer slots all can be used, except `default`. | -  |

### Image Exposes

| 方法名                  | 说明       | 类型                         |
| -------------------- | -------- | -------------------------- |
| showPreview ^(2.9.4) | 手动打开大图预览 | ^[Function]`() => void` |

## Image Viewer API

### Image Viewer Attributes

| 事件名                    | 说明                                                    | Type                  | 默认值   |
| ---------------------- | ----------------------------------------------------- | --------------------- | ----- |
| url-list               | 用于预览的图片链接列表                                           | ^[array]`string[]`    | []    |
| z-index                | 预览时遮罩层的 z-index                                       | ^[number] / ^[string] | —     |
| initial-index          | 初始预览图像索引，小于 `url-list` 的长度                            | ^[number]             | 0     |
| infinite               | 是否可以无限循环预览                                            | ^[boolean]            | true  |
| hide-on-click-modal    | 是否可以通过点击遮罩层关闭预览                                       | ^[boolean]            | false |
| teleported             | image 自身是否插入至 body 元素上。嵌套的父元素属性会发生修改时应该将此属性设置为 `true` | ^[boolean]            | false |
| zoom-rate ^(2.2.27)    | 图像查看器缩放事件的缩放速率。                                       | ^[number]             | 1.2   |
| scale ^(2.11.3)        | 预览图像缩放。                                               | ^[number]             | 1     |
| min-scale ^(2.4.0)     | 图像查看器缩放事件的最小缩放比例                                      | ^[number]             | 0.2   |
| max-scale ^(2.4.0)     | 图像查看器缩放事件的最大缩放比例                                      | ^[number]             | 7     |
| close-on-press-escape  | 是否可以通过按下 ESC 关闭 Image Viewer                          | ^[boolean]            | true  |
| show-progress ^(2.9.4) | 是否显示预览图片的进度条内容                                        | ^[boolean]            | false |

### Image Viewer Events

| Name             | 说明                                                 | 类型                                      |
| ---------------- | -------------------------------------------------- | --------------------------------------- |
| close            | 当点击 X 按钮或者在` hide-on-click-modal `为 true 时点击遮罩层时触发 | ^[Function]`() => void`              |
| error ^(2.11.3)  | 图片加载失败触发                                           | ^[Function]`(e: Event) => void`      |
| switch           | 切换图像时触发。                                           | ^[Function]`(index: number) => void` |
| rotate ^(2.3.13) | 旋转图像时触发。                                           | ^[Function]`(deg: number) => void`   |

### Image Viewer Slots

| 名称                     | 详情                                   | 类型                                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default                | 自定义内容                                | -                                                                                                                                                                                                                                  |
| progress ^(2.9.4)      | 自定义进度内容 (优先级高于 `show-progress` prop) | ^[object]`{ activeIndex: number, total: number }`                                                                                                                                                                                  |
| toolbar ^(2.9.4)       | 自定义工具栏内容                             | ^[object]`{ actions: (action: ImageViewerAction, options?: ImageViewerActionOptions) => void, prev: () => void, next: () => void, reset: () => void, activeIndex: number, setActiveItem: (index: number) => void }` |
| viewer-error ^(2.11.3) | 自定义图像加载失败的内容                         | ^[object]`{ activeIndex: number, src: string }`                                                                                                                                                                                    |

### Image Viewer Exposes

| Name          | Description | Type                                    |
| ------------- | ----------- | --------------------------------------- |
| setActiveItem | 手动切换图片      | ^[Function]`(index: number) => void` |

## 类型声明

<details>
  <summary>Show declarations</summary>

```ts
type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'clockwise' | 'anticlockwise'
type ImageViewerActionOptions = {
  enableTransition?: boolean
  zoomRate?: number
  rotateDeg?: number
}
```

</details>
