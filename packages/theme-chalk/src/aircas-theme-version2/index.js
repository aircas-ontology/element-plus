import { defineComponent, h } from 'vue'
import ElementPlus, { ElCard, ElTag } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './theme.css'

export { tokens, componentCoverage } from './tokens.js'
export * from 'element-plus'

export const UiPanel = defineComponent({
  name: 'UiPanel',
  inheritAttrs: false,
  props: { title: String, padded: { type: Boolean, default: true } },
  setup(props, { slots, attrs }) {
    return () => h(ElCard, { ...attrs, shadow: 'never', class: ['ui-panel', { 'ui-panel--flush': !props.padded }, attrs.class] }, {
      header: () => h('div', { class: 'ui-panel__heading' }, [
        h('span', { class: 'ui-panel__title' }, slots.title ? slots.title() : props.title),
        slots.actions && h('div', { class: 'ui-panel__actions' }, slots.actions()),
      ]),
      default: () => slots.default?.(),
    })
  },
})

export const UiStatus = defineComponent({
  name: 'UiStatus',
  props: {
    type: { type: String, default: 'primary', validator: value => ['primary', 'success', 'warning', 'danger', 'info'].includes(value) },
    label: String,
    tag: Boolean,
  },
  setup(props, { slots }) {
    return () => props.tag
      ? h(ElTag, { type: props.type, effect: 'light' }, () => slots.default?.() ?? props.label)
      : h('span', { class: ['ui-status', `ui-status--${props.type}`], role: 'status' }, [
        h('span', { class: 'ui-status__dot', 'aria-hidden': 'true' }),
        slots.default?.() ?? props.label,
      ])
  },
})

export function applyTheme() {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('dark', 'styles-theme')
    document.documentElement.dataset.stylesTheme = 'dark'
  }
}

const StylesTheme = {
  install(app, options = {}) {
    applyTheme()
    app.use(ElementPlus, { ...options, size: options.size ?? 'small', locale: options.locale ?? zhCn })
    app.component('UiPanel', UiPanel)
    app.component('UiStatus', UiStatus)
  },
}
export default StylesTheme
