import {html, css, TemplateResult, } from "lit"
import {customElement, query} from "lit/decorators.js"
//import {MobxReactionUpdate} from "@adobe/lit-mobx"
import {BootBase,appStore} from "./boot-base"
import "./boot-people"
import "./boot-addperson"
import {BootAddPerson} from "./boot-addperson"

//MobiX is needed only for elements contacted to the app state store
@customElement("page-people")
class PagePeople extends BootBase {
  static styles = [...BootBase.styles, css`:host{text-align: center;}`]
  @query("boot-addperson") addPerson!:BootAddPerson
  override render():TemplateResult { return html`
    <h1>Hello BootStrap in Shadow DOM!</h1>
    <button type="button" class="btn btn-primary"  
        @click=${():void => {appStore.loadData(true,this)}}>Load Remote Data</button>
    <button type="button" class="btn btn-primary"  
        @click=${():void => {this.addPerson.show(this)}}>Add Person</button>
    <button type="button" class="btn btn-primary"  
        @click=${():void => {appStore.setPage("Headers")}}>Page Headers</button>
    <boot-people></boot-people>
    <boot-addperson></boot-addperson>
  `}
}
declare global { interface HTMLElementTagNameMap { "page-people": PagePeople}}

