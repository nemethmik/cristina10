//import "bootstrap/dist/css/bootstrap.min.css"
import bootstrapcss from "bootstrap/dist/css/bootstrap.min.css"
import {html, css, LitElement, TemplateResult, unsafeCSS} from "lit"
import {customElement} from "lit/decorators.js"
import {MobxReactionUpdate} from "@adobe/lit-mobx"

class BootBase extends LitElement {
  static styles = [unsafeCSS(bootstrapcss)]
}
//MobiX is needed only for elements contacted to the app state store
@customElement("boot-app")
class BootApp extends MobxReactionUpdate(BootBase) {
  static styles = [...BootBase.styles, css`:host{text-align: center;}`]
  override render():TemplateResult { return html`
    <h1>Hello BootStrap in Shadow DOM!</h1>
    <button type="button" class="btn btn-primary">A Bootstrap Button</button>
  `}
  //override createRenderRoot() {return this}
}
declare global { interface HTMLElementTagNameMap { "boot-app": BootApp}}

