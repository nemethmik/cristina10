import {Toast} from "bootstrap"
import {html, TemplateResult} from "lit"
import {customElement,property, query} from "lit/decorators.js"
import {msg, localized} from "@lit/localize"
import {BootBase} from "./boot-base"

@localized()
@customElement("boot-toast")
export class BootToast extends BootBase {
    @property() small = "" 
    @property() message = "" 
    @query(".toast") toastEl!:HTMLElement
    private _toastBox:Toast | undefined = undefined
    get toastBox():Toast {
        if(!this._toastBox) this._toastBox = new Toast(this.toastEl,{animation:true,autohide:true,delay:2000})
        return this._toastBox
    }
    show(small:string, message:string):void {
        this.small = small
        this.message = message
        this.toastBox.show()
    }
    override render():TemplateResult {return html`
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <!-- img src={logo} width=30 class="rounded me-2" alt="logo" -->
                    <strong class="me-auto"><i class="bi bi-stars"></i>${msg(`Bootstrap Toast`)}</strong>
                    <small>${this.small}</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${this.message}</div>
            </div>
        </div>    
    `}
}
declare global { interface HTMLElementTagNameMap { "boot-toast": BootToast}}