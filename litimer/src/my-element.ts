import { html, css, LitElement,TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
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
    //super.render()
    return html`
      <h1>Hello, ${this.name}!</h1>
      <slot name=before>Default Impl of Slot named before</slot>
      <button @click=${()=>this.count++ /*this._onClick*/} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `
  }
  // private _onClick(e:Event) {
  //   console.log("onClick",e)
  //   this.count++
  // }

  foo(): string {
    return 'foo'
  }
}
//declare global {interface HTMLElementTagNameMap {'my-element': MyElement}}
