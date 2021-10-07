import {html, css, TemplateResult, } from "lit"
import {customElement, query} from "lit/decorators.js"
import {msg, localized} from "@lit/localize"
//import {MobxReactionUpdate} from "@adobe/lit-mobx"
import {BootBase,appStore} from "./boot-base"
import "./boot-people"
import "./boot-addperson"
import {BootAddPerson} from "./boot-addperson"

//MobiX is needed only for elements contacted to the app state store
@localized()
@customElement("page-people")
class PagePeople extends BootBase {
  static styles = [...BootBase.styles, css`:host{text-align: center;}`]
  @query("boot-addperson") addPerson!:BootAddPerson
  override render():TemplateResult { return html`
    <h1>${msg(`Hello BootStrap in Shadow DOM!`)}</h1>
    <button type="button" class="btn btn-primary"  
        @click=${():void => {appStore.loadData(true,this)}}>${msg(`Load Remote Data`)}</button>
    <button type="button" class="btn btn-primary"  
        @click=${():void => {this.addPerson.show(this)}}>${msg(`Add Person`)}</button>
    <button type="button" class="btn btn-primary"  
        @click=${():void => {appStore.setPage("Headers")}}>${msg(`Page Headers`)}</button>
    <boot-people></boot-people>
    <boot-addperson></boot-addperson>
  `}
}
declare global { interface HTMLElementTagNameMap { "page-people": PagePeople}}

