import {html, TemplateResult, } from "lit"
import {customElement, query} from "lit/decorators.js"
import {msg, localized, str} from "@lit/localize"
import {MobxReactionUpdate} from "@adobe/lit-mobx"
import {BootBase,appStore,TPeopleEvent,TPeopleActions} from "./boot-base"
import "./page-people"
import "./page-headers"
import "./boot-toast"
import {BootToast} from "./boot-toast"

//MobiX is needed only for elements contacted to the app state store
@localized()
@customElement("boot-app")
class BootApp extends MobxReactionUpdate(BootBase) {
  override connectedCallback():void {
    this.addEventListener(TPeopleEvent,((e:CustomEvent):void => {
      const detail = e.detail as TPeopleActions
      switch(detail.type) {
        case "Load": this.toast.show(msg(`People Re-loaded`),msg(str`${detail.numberOfPeopleLoaded} persons found`)); break
        case "Add": this.toast.show(msg(`New Person Added`),msg(str`${detail.person.firstName} added`)); break
      }
    }) as EventListener)
    super.connectedCallback()
  }
  @query("boot-toast") toast!:BootToast
  override render():TemplateResult { return html`
    ${appStore.page == "People" ? html`<page-people></page-people>` : undefined}
    ${appStore.page == "Headers" ? html`<page-headers></page-headers>` : undefined}
    <boot-toast small="Small Text" message="Message Text"></boot-toast>
  `}
}
declare global { interface HTMLElementTagNameMap { "boot-app": BootApp}}

