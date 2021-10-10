import {html, LitElement, TemplateResult} from "lit"
import {customElement, state} from "lit/decorators.js"
import {asyncReplace} from "lit/directives/async-replace.js"
import {makeAutoObservable,reaction,autorun} from "mobx"

class TimerController {
    private _run = true
    get run():boolean {return this._run}
    constructor() {makeAutoObservable(this)}
    start():void {this._run = true}
    stop():void {this._run = false}
}
export const timerController = new TimerController()

@customElement("my-timer")
class MyTimer extends LitElement { 
    async *countUp() {
        const start = Date.now()
        while(timerController.run) { //timerController.run) {
            const now = Date.now()
            yield now - start
            await new Promise(r => setTimeout(r,100))
        }        
    }
    @state() private timer = this.countUp() // timer has to be decorated as @state
    override render():TemplateResult {return html`
        <slot>Timer:</slot><span>${asyncReplace(this.timer)}</span><slot name=after></slot>
    `} 
    override connectedCallback(): void {
        // The side effect is that the countUp iterator generator has to be restarted.
        // Both autorun and reaction are fine
        // See https://mobx.js.org/reactions.html#reaction
        //reaction(() => timerController.run,(run) => run ? this.timer = this.countUp() : undefined)
        // See https://mobx.js.org/reactions.html#autorun 
        autorun(() => timerController.run ? this.timer = this.countUp() : undefined)
        super.connectedCallback()
    }  
}
declare global {interface HTMLElementTagNameMap {'my-timer': MyTimer}}