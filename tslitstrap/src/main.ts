import {html, css, TemplateResult, } from "lit"
import {customElement, query} from "lit/decorators.js"
//import {MobxReactionUpdate} from "@adobe/lit-mobx"
import {BootBase,appStore,TPeopleEvent,TPeopleActions} from "./boot-base"
import "./boot-people"
import "./boot-toast"
import {BootToast} from "./boot-toast"
import "./boot-addperson"
import {BootAddPerson} from "./boot-addperson"

//MobiX is needed only for elements contacted to the app state store
@customElement("boot-app")
class BootApp extends BootBase {
  static styles = [...BootBase.styles, css`:host{text-align: center;}`]
  override connectedCallback():void {
    this.addEventListener(TPeopleEvent,((e:CustomEvent):void => {
      const detail = e.detail as TPeopleActions
      switch(detail.type) {
        case "Load": this.toast.show(`People Re-loaded`,`${detail.numberOfPeopleLoaded} persons found`); break
        case "Add": this.toast.show(`New Person Added`,`${detail.person.firstName} added`); break
      }
    }) as EventListener)
    super.connectedCallback()
  }
  @query("boot-toast") toast!:BootToast
  @query("boot-addperson") addPerson!:BootAddPerson
  override render():TemplateResult { return html`
    <h1>Hello BootStrap in Shadow DOM!</h1>
    <button type="button" class="btn btn-primary"  
      @click=${():void => {
        appStore.loadData(true,this)
      }}
      >Load Remote Data</button>
    <button type="button" class="btn btn-primary"  
    @click=${():void => {
      this.addPerson.show(this)
    }}
    >Add Person</button>
    <boot-people></boot-people>
    <boot-toast small="Small Text" message="Message Text"></boot-toast>
    <boot-addperson></boot-addperson>
  `}
}
declare global { interface HTMLElementTagNameMap { "boot-app": BootApp}}

