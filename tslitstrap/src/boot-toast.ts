import {Toast} from "bootstrap"
import {html, TemplateResult} from "lit"
import {customElement,property, query} from "lit/decorators.js"
import {BootBase} from "./boot-base"

@customElement("boot-toast")
export class BootToast extends BootBase {
    @property() small = "" 
    @property() message = "" 
    @query(".toast") toast!:HTMLElement
    show(small:string, message:string):void {
        this.small = small
        this.message = message
        const toast = new Toast(this.toast,{animation:true,autohide:true,delay:2000})
        toast.show()
    }
    override render():TemplateResult {return html`
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <!-- img src={logo} width=30 class="rounded me-2" alt="logo" -->
                    <strong class="me-auto"><i class="bi bi-stars"></i>Bootstrap Toast</strong>
                    <small>${this.small}</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${this.message}</div>
            </div>
        </div>    
    `}
}
declare global { interface HTMLElementTagNameMap { "boot-toast": BootToast}}