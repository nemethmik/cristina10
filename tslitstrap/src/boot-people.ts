import {html, css, TemplateResult, } from "lit"
import {customElement, state, query} from "lit/decorators.js"
import {MobxReactionUpdate} from "@adobe/lit-mobx"
import {BootBase,TPerson,IBootPeople} from "./boot-base"

@customElement("boot-people")
class BootPeople extends BootBase implements IBootPeople {
  @state() people:TPerson[] = []
  override connectedCallback():void {
    super.connectedCallback()
    this.loadData(false)
  }
  public async loadData(remote = true):Promise<void> {
    //Call this from the constructor. Don't call it from firstUpdate
    //THIS IS VERY IMPORTANT TO GIVE a chance to the component to construct itself
    await new Promise((r) => setTimeout(r, 0))
    this.people = []
    await new Promise((r) => setTimeout(r, 1000)) // This is just a delayer to simulate long running tasks
    const endpoint = remote ? "https://demo.vaadin.com/demo-data/1.0/people?count=200" : "./people.json"
    this.people = (await (await fetch(endpoint)).json()).result
  }
  override render():TemplateResult {
    let id = 1
    return html`
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        ${this.people.map((p) => html`
          <tr>
            <th scope="row">${id++}</th>
            <td>${p.firstName}</td>
            <td>${p.lastName}</td>
            <td>${p.email}</td>
          </tr>
        `)}
      </tbody>
    </table>
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
