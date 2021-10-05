import {html, css, TemplateResult, } from "lit"
import {customElement, state, query} from "lit/decorators.js"
import {MobxReactionUpdate} from "@adobe/lit-mobx"
import {BootBase, IBootPeople} from "./boot-base"
import "./boot-people"

//MobiX is needed only for elements contacted to the app state store
@customElement("boot-app")
class BootApp extends MobxReactionUpdate(BootBase) {
  static styles = [...BootBase.styles, css`:host{text-align: center;}`]
  @query("boot-people") bootPeople!:IBootPeople
  override render():TemplateResult { return html`
    <h1>Hello BootStrap in Shadow DOM!</h1>
    <button type="button" class="btn btn-primary"  
      @click=${():void => {this.bootPeople.loadData(true)}}>Load Remote Data</button>
    <boot-people></boot-people>
  `}
  //override createRenderRoot() {return this} //Uncomment this to bring the element to the Light DOM, but then you cannot use slots 
}
declare global { interface HTMLElementTagNameMap { "boot-app": BootApp}}

