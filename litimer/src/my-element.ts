import { html, css, LitElement,TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
//import "./my-timer"

@customElement('my-element')
export class MyElement extends LitElement { //HTMLElement
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `
  @property() name = 'World'
  @property({ type: Number }) count = 0
  override render():TemplateResult {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <slot name=before>Default Impl of Slot named before</slot>
      <button @click=${()=>this.count++ /*this._onClick*/} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `
  }
  foo(): string {
    return 'foo'
  }
}
declare global {interface HTMLElementTagNameMap {'my-element': MyElement}}
