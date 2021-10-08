import {html, TemplateResult, } from "lit"
import {customElement, } from "lit/decorators.js"
import {msg, str, localized} from "@lit/localize"
import {MobxReactionUpdate} from "@adobe/lit-mobx"
import {BootBase, appStore} from "./boot-base"

@localized()
@customElement("boot-people")
class BootPeople extends MobxReactionUpdate(BootBase) {
  override connectedCallback():void {
    super.connectedCallback()
    //This is the web component that is triggering data load
    //The app state store is not automatically loads data, it's always requested by a UI component 
    appStore.loadData(false,this)
  }
  override render():TemplateResult {
    let id = 1
    return html`
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">${msg(`First`,{desc:`First Name of the Person`,id:"first-name"})}</th>
          <th scope="col">${msg(`Last`,{desc:`Last Name of the Person`,id:"last-name"})}</th>
          <th scope="col">${msg(`Handle`,{desc:`Email Address of the Person`,id:"email-address"})}</th>
        </tr>
      </thead>
      <tbody>
        ${appStore.peopleMap((p) => html`
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
      ${appStore.numberOfPeople ? html`<h2>${msg(str`Number of people ${appStore.numberOfPeople}`)}</h2>` : html`
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden">${msg(`Loading`)}...</span>
        </div>
      `}
    </p>
  `}  
}
declare global { interface HTMLElementTagNameMap { "boot-people": BootPeople}}
