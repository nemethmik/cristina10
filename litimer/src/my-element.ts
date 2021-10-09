import { html, css, LitElement,TemplateResult } from 'lit'
import { customElement, property, query, state, queryAssignedNodes } from 'lit/decorators.js'
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
  @queryAssignedNodes("before") beforeSlotNodes!:NodeListOf<HTMLElement>
  @queryAssignedNodes("") defSlotNodes!:NodeListOf<HTMLElement>
  querySlotElementAll(slotNodes:NodeListOf<HTMLElement>,name:string):HTMLElement[] {
    const slotChildren = Array.from(slotNodes).filter(e=>e.querySelectorAll)
    const selectedElements = slotChildren.map(e => Array.from(e.querySelectorAll(name)))
    const arr = selectedElements.reduce((acc,val) => acc.concat(val),[]) as HTMLElement[]
    //console.log(arr)
    return arr
  }
  override render():TemplateResult {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <slot name=before>Default Impl of Slot named before</slot>
      <button @click=${()=>this.count++ /*this._onClick*/} part="button">
        Click Count: ${this.count}
      </button>
      <button @click=${async ()=> {
          const timers = this.querySlotElementAll(this.defSlotNodes,"my-timer")
          timers.forEach(t => this.runTimer ? t.removeAttribute("run") : t.setAttribute("run","true"))
          this.runTimer = !this.runTimer
          await new Promise(r => setTimeout(r,1))
          window.alert(`${timers.length} slotted timers have been ${this.runTimer ? `started` : `stopped`}`)
        }}>
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
