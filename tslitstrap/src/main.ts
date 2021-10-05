//import "bootstrap/dist/css/bootstrap.min.css" //This is required only for Light DOM
import bootstrapcss from "bootstrap/dist/css/bootstrap.min.css" //This is for Shadow DOM
import {html, css, LitElement, TemplateResult, unsafeCSS} from "lit"
import {customElement, state} from "lit/decorators.js"
//import {Task,TaskFunction} from "@lit-labs/task" //This is brutally underdocumented
import {MobxReactionUpdate} from "@adobe/lit-mobx"

class BootBase extends LitElement {
  static styles = [unsafeCSS(bootstrapcss)]
  //static styles = [bootstrapstyles as CSSResultOrNative]
}
//MobiX is needed only for elements contacted to the app state store
@customElement("boot-app")
class BootApp extends MobxReactionUpdate(BootBase) {
  static styles = [...BootBase.styles, css`:host{text-align: center;}`]
  override render():TemplateResult { return html`
    <h1>Hello BootStrap in Shadow DOM!</h1>
    <button type="button" class="btn btn-primary">A Bootstrap Button</button>
    <boot-people></boot-people>
  `}
  //override createRenderRoot() {return this}  
}
declare global { interface HTMLElementTagNameMap { "boot-app": BootApp}}

type TPerson = {
  firstName: string,
  lastName: string,
  address: {
      street: string,
      city: string,
      state: string,
      zip: string,
      country: string,
      phone: string
  },
  email: string
}
@customElement("boot-people")
class BootPeople extends BootBase {
  @state() people:TPerson[] = []
  override connectedCallback():void {
    super.connectedCallback()
    this.loadData(false)
  }
  async loadData(remote = true):Promise<void> {
    //Call this from the constructor. Don't call it from firstUpdate
    //THIS IS VERY IMPORTANT TO GIVE a chance to the component to construct itself
    await new Promise((r) => setTimeout(r, 0))
    await new Promise((r) => setTimeout(r, 1000)) // This is just a delayer to simulate long running tasks
    const endpoint = remote ? "https://demo.vaadin.com/demo-data/1.0/people?count=200" : "./people.json"
    // const res = await fetch(endpoint)
    // const data = await res.json()
    //this.people = data.result
    this.people = (await (await fetch(endpoint)).json()).result
  }
  override render():TemplateResult {return html`
    <p>
    ${this.people.length ? html`<h2>Number of people ${this.people.length}</h2>` : html`
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `}
    </p>
  `}  
}
declare global { interface HTMLElementTagNameMap { "boot-people": BootPeople}}
