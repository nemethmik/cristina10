import { html, css, LitElement,TemplateResult } from 'lit'
import { customElement, property, query, state, queryAssignedNodes } from 'lit/decorators.js'
import "./my-timer" 
//import {TTimerEvent,TTimerActions} from "./my-timer" 

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
    const slotChildren = Array.from(slotNodes).filter(e => e.querySelectorAll)
    const selectedElements = slotChildren.map(e => e.nodeName.toLowerCase() == name ? [e] : Array.from(e.querySelectorAll(name)))
    return selectedElements.reduce((acc,val) => acc.concat(val),[]) as HTMLElement[]
  }
  override render():TemplateResult {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <slot name=before>Default Impl of Slot named before</slot>
      <button @click=${()=>this.count++ /*this._onClick*/} part="button">
        Click Count: ${this.count}
      </button>
      <button @click=${async ()=> {
          // const timers = this.querySlotElementAll(this.defSlotNodes,"my-timer")
          // timers.forEach(t => this.runTimer ? t.removeAttribute("run") : t.setAttribute("run","true"))
          this.timers.forEach(t => this.runTimer ? t.removeAttribute("run") : t.setAttribute("run","true"))
          this.runTimer = !this.runTimer
          // await new Promise(r => setTimeout(r,1))
          // window.alert(`${timers.length} slotted timers have been ${this.runTimer ? `started` : `stopped`}`)
        }}>
        ${this.runTimer ? `Stop` : `Run`}
      </button>
      <my-timer ?run=${this.runTimer} id=myelementimer1></my-timer>
      <slot></slot>
    `
  }
  foo(): string {
    return 'foo'
  }
  timers:HTMLElement[] = []
  registerTimer(timer: HTMLElement): void {
    // console.log("registerTimer", timer)
    this.timers.push(timer)
  }
  unregisterTimer(timer: HTMLElement): void {
    this.timers.splice(this.timers.indexOf(timer), 1)
  } 
  override connectedCallback():void {
    this.updateComplete.then(()=>{
      console.log("UPDATE COMPLETE1===")
      const timers = this.querySlotElementAll(this.defSlotNodes,"my-timer")
      timers.forEach(t => this.registerTimer(t))  
    })
    this.updateComplete.then(()=>{
      console.log("UPDATE COMPLETE2===")
    })
    // this.addEventListener(TTimerEvent,((e:CustomEvent)=>{
    //   const timer = e.composedPath()[0] as HTMLElement
    //   const detail = e.detail as TTimerActions
    //   console.log(TTimerEvent,timer,detail.type)
    //   switch(detail.type) {
    //     case "Connected": this.registerTimer(timer); break
    //     case "Disconnected": this.unregisterTimer(timer); break
    //   }
    // }) as EventListener)
    super.connectedCallback()
  }
}
declare global {interface HTMLElementTagNameMap {'my-element': MyElement}}
