import { html, LitElement, TemplateResult } from "lit"
import { customElement, property } from "lit/decorators.js"
import "@vaadin/vaadin-icon/vaadin-icon"
import "@vaadin/vaadin-icons/vaadin-iconset"
import "./page-config"
import "./page-login"
import {TCustomEvents} from "./page-base"

type TAppPages = "Config" | "Login"
@customElement("my-mobileapp")
class MobileApp extends LitElement {
  @property() page:TAppPages = "Config"
  override render():TemplateResult {
    //console.log("MobileApp:render")
    return html`
      ${this.page == "Config" ? html`<page-config></page-config>` : ``}
      ${this.page == "Login" ? html`<page-login></page-login>` : ``}
    `
  }
  override connectedCallback():void {
    super.connectedCallback()
    // WARNING!!! DON'T DEFINE an EVENT LISTENER on THE SHADOW ROOT if you want to reference "THIS"
    // this.shadowRoot!.addEventListener( DON'T DO THIS )
    this.addEventListener(TCustomEvents.ConfigDone,this.onConfigDone as EventListener)
    this.addEventListener(TCustomEvents.LoginBack,():void=>{this.page = "Config"})
  }
  // Removel of event listeners on the app level is optional, but definitely a good practice
  override disconnectedCallback():void {
    super.disconnectedCallback()
    this.removeEventListener(TCustomEvents.ConfigDone,this.onConfigDone as EventListener)
  }
  onConfigDone(e:CustomEvent):void {
    console.log("MobileApp:onConfigDone",e)
    this.page = "Login"
  }
}
declare global { interface HTMLElementTagNameMap { "my-mobileapp": MobileApp}}