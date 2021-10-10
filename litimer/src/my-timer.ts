import {html, LitElement, TemplateResult} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import {asyncReplace} from "lit/directives/async-replace.js"
export const TTimerEvent = "timer"
export type TTimerActions = 
    {type: "Connected"} 
  | {type: "Disconnected"} 
function dispatchTimerEvent(el:HTMLElement,detail:TTimerActions):void {
    el.dispatchEvent(new CustomEvent(TTimerEvent,{detail,composed:true,bubbles:true,cancelable:false}))
}

@customElement("my-timer")
class MyTimer extends LitElement {
    @property({type:Boolean}) run = false
    async *countUp() {
        const start = Date.now()
        while(this.run) {
            const now = Date.now()
            yield now - start
            await new Promise(r => setTimeout(r,100))
        }        
    }
    override attributeChangedCallback(name:string,old:string,value:string) {
        super.attributeChangedCallback(name,old,value)
        if(this.run) this.timer = this.countUp()
    }
    @state() private timer = this.countUp()
    override render():TemplateResult {
        return html`
            <slot>Timer:</slot><span>${asyncReplace(this.timer)}</span><slot name=after></slot>
        `
    } 
    override connectedCallback(): void {
        super.connectedCallback()
        //dispatchTimerEvent(this,{type:"Connected"})
        this.updateComplete.then(()=>dispatchTimerEvent(this,{type:"Connected"}))         
    }  
}
declare global {interface HTMLElementTagNameMap {'my-timer': MyTimer}}