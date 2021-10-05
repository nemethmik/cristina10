import {html, css, TemplateResult, } from "lit"
import {customElement, } from "lit/decorators.js"
import {MobxReactionUpdate} from "@adobe/lit-mobx"
import {BootBase,appStore} from "./boot-base"
import "./boot-people"

//MobiX is needed only for elements contacted to the app state store
@customElement("boot-app")
class BootApp extends MobxReactionUpdate(BootBase) {
  static styles = [...BootBase.styles, css`:host{text-align: center;}`]
  override render():TemplateResult { return html`
    <h1>Hello BootStrap in Shadow DOM!</h1>
    <button type="button" class="btn btn-primary"  
      @click=${():void => {appStore.loadData(true)}}
      >Load Remote Data</button>
    <boot-people></boot-people>
  `}
}
declare global { interface HTMLElementTagNameMap { "boot-app": BootApp}}

