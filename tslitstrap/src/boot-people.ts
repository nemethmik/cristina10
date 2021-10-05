import {html, TemplateResult, } from "lit"
import {customElement, } from "lit/decorators.js"
import {MobxReactionUpdate} from "@adobe/lit-mobx"
import {BootBase, appStore} from "./boot-base"

@customElement("boot-people")
class BootPeople extends MobxReactionUpdate(BootBase) {
  override connectedCallback():void {
    super.connectedCallback()
    appStore.loadData(false)
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
        ${appStore.people.map((p) => html`
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
      ${appStore.people.length ? html`<h2>Number of people ${appStore.people.length}</h2>` : html`
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      `}
    </p>
  `}  
}
declare global { interface HTMLElementTagNameMap { "boot-people": BootPeople}}
