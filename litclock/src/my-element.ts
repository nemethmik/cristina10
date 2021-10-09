import { html, css, LitElement } from 'lit'
import { customElement, property, state, queryAssignedNodes } from 'lit/decorators.js'
import "./my-timer" // Custom elements are import this way

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `
  @property() name = 'World'
  @queryAssignedNodes("") defaultSlotNodes!:NodeListOf<HTMLElement>
  /**
   * Queries all the slotted elements from the shadow DOM of this (custom) element.
   * This method function is best placed in a base/parent/framework custom element class.
   * @param slotNodes The list of nodes provided by a @queryAssignedNodes() member
   * @param name the element tag name (div, my-timer, for example) 
   * @returns All the HTMLElements in an array
   */
  querySlotElementAll(slotNodes:NodeListOf<HTMLElement>,name:string):[HTMLElement | null]  {
    //const slotElement = this.shadowRoot?.querySelector(slot ? `slot[name=${slot}]` : `slot`) as HTMLSlotElement
    //console.log("slotElement", slotElement)
    //console.log("slotelementQuery",this.shadowRoot?.querySelectorAll(name)) //This returns nothing
    const slotChildren = Array.from(slotNodes).filter(e=>e.querySelectorAll) //slotElement.assignedElements()
    //console.log("slotChildren", slotChildren)
    //If the element directly in the slotChildren array, e.querySelectorAll(name) will not find it
    //Even if the element has its own Shadow DOM e.querySelectorAll(name) will be able to find those deeply embedded elements, too.
    const selectedElements = slotChildren?.map((e) => e.nodeName == name.toUpperCase() ? [e] : Array.from(e.querySelectorAll(name)))       
    //.filter(e=>e.length > 0) //Not required since the reduce/concat will remove empty arrays
    //console.log("selectedElements",selectedElements)
    return selectedElements.reduce((acc, val) => acc.concat(val), []) as [HTMLElement | null]
  }
  @property({ type: Number })  count = 0
  @state() run = true
  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <button @click=${async () => {
        //console.log(Array.from(this.defaultSlotNodes).filter(e=>e.querySelectorAll)) 
        const timers = this.querySlotElementAll(this.defaultSlotNodes,"my-timer")
        //console.log(clocks, this.run)
        timers?.forEach((c) => this.run ? c?.removeAttribute("run") : c?.setAttribute("run","true"))
        this.run = !this.run
        // Add a chance to browser to update the screen before popping up alert
        await new Promise((r) => setTimeout(r, 1))
        // Alert will put all clocks on hal for the time the alert is on
        window.alert(`${timers.length} clocks have been ${this.run ? `started` : `stopped` }`)
      }}>${this.run ? `Stop` : `Start`}</button>
      <slot></slot>
    `
  }
  private _onClick() {this.count++}
}
declare global {interface HTMLElementTagNameMap {'my-element': MyElement}}
