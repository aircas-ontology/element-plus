import type { DefineComponent, Plugin } from 'vue'
import type { ConfigProviderProps } from 'element-plus'
export * from 'element-plus'
export { tokens, componentCoverage } from './tokens.js'
export type StylesThemeOptions = Partial<Pick<ConfigProviderProps, 'size' | 'locale' | 'zIndex' | 'button' | 'message'>>
export declare const UiPanel: DefineComponent<{ title?: string; padded?: boolean }>
export declare const UiStatus: DefineComponent<{ type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'; label?: string; tag?: boolean }>
export declare function applyTheme(): void
/** Registers Element Plus, UiPanel and UiStatus. Defaults to dark / small / zh-CN. */
declare const StylesTheme: Plugin<[options?: StylesThemeOptions]>
export default StylesTheme

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    UiPanel: typeof UiPanel
    UiStatus: typeof UiStatus
  }
}
