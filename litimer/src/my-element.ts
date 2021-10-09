import { html, css, LitElement,TemplateResult } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
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
  @query("my-timer") myTimer!:HTMLElement
  @state() runTimer = true
  override render():TemplateResult {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <slot name=before>Default Impl of Slot named before</slot>
      <button @click=${()=>this.count++ /*this._onClick*/} part="button">
        Click Count: ${this.count}
      </button>
      <button @click=${()=>this.runTimer = !this.runTimer}>
        ${this.runTimer ? `Stop` : `Run`}
      </button>
      <my-timer ?run=${this.runTimer}></my-timer>
      <slot></slot>
    `
  }
  foo(): string {
    return 'foo'
  }
}
declare global {interface HTMLElementTagNameMap {'my-element': MyElement}}
