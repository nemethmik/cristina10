import {html, LitElement, TemplateResult} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import {asyncReplace} from "lit/directives/async-replace.js"

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
    @state() private timer = this.countUp()
    override render():TemplateResult {
        return html`
            My Timer: <span>${asyncReplace(this.timer)}</span>
        `
    } 
}
declare global {interface HTMLElementTagNameMap {'my-timer': MyTimer}}