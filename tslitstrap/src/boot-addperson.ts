import {Modal} from "bootstrap"
import {html, TemplateResult} from "lit"
import {customElement,query} from "lit/decorators.js"
import {ref,createRef} from "lit/directives/ref.js"
import {msg,localized} from "@lit/localize"
import {BootBase,appStore,dispatchPeopleEvent} from "./boot-base"

@localized()
@customElement("boot-addperson")
export class BootAddPerson extends BootBase {
    @query(".modal") _modalEl!:HTMLElement
    private _firstName = createRef<HTMLInputElement>() //${ref(this._firstName)}
    private _lastName = createRef<HTMLInputElement>() 
    private _email = createRef<HTMLInputElement>() 
    private _modalDialog:Modal | undefined = undefined
    get modalDialog():Modal {
        // This is the correct and working practice, if an object has been created for the modal
        // element, it should be used.
        if(!this._modalDialog) this._modalDialog = new Modal(this._modalEl,{keyboard:true,focus:true})
        return this._modalDialog
    }
    public show(relatedTarget:HTMLElement | undefined = undefined):void {
        this.modalDialog.show(relatedTarget)
    }
    override render():TemplateResult {return html`
    <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${msg("New Person Details")}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label=${msg("Close")}></button>
            </div>
            <div class="modal-body">
                <form>
                <div class="mb-3">
                    <label class="col-form-label">${msg(`First Name:`)}</label>
                    <input ${ref(this._firstName)} type="text" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="col-form-label">${msg(`Last Name:`)}</label>
                    <input ${ref(this._lastName)} type="text" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="col-form-label">${msg(`Email:`)}</label>
                    <input ${ref(this._email)} type=email class="form-control" id="handle"></textarea>
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary"
                    @click=${():void => {
                        const firstName = this._firstName.value?.value as string
                        const lastName = this._lastName.value?.value as string
                        const email = this._email.value?.value as string
                        const p = {firstName,lastName,email}
                        appStore.addPerson(p)
                        dispatchPeopleEvent(this,{type:"Add",person:p})    
                        this.modalDialog.hide()
                    }}
                >${msg("Save")}</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${msg(`Cancel`)}</button>
            </div>
            </div>
        </div>
    </div>
    `}
}
declare global { interface HTMLElementTagNameMap { "boot-addperson": BootAddPerson}}
