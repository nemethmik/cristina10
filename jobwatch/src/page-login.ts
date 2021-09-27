import { html, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"
import "@vaadin/vaadin-text-field/vaadin-text-field"
import "@vaadin/vaadin-text-field/vaadin-password-field"
import "@vaadin/vaadin-checkbox/vaadin-checkbox"
import "@vaadin/vaadin-text-field/vaadin-integer-field"
import "@vaadin/vaadin-button"
import {PageBase, TCustomEvents, TLoginBackPayload} from "./page-base"

@customElement("page-login")
class PageLogin extends PageBase {
    render():TemplateResult {
        return html`
        <section>
            <header>
                <h1>Login</h1>
            </header>
            <main>
                <table>
                    <tr>
                        <td><label>Employee</label></td>
                        <td><vaadin-text-field placeholder=maria clear-button-visible></vaadin-text-field></td>
                    </tr>
                    <tr>
                        <td>Pin</td>
                        <td><vaadin-password-field></vaadin-text-field></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><vaadin-checkbox checked=true><label>Auto-login<label></vaadin-checkbox></td>
                    </tr>
                </table>            
            </main>            
        </section>
        <footer>
            <vaadin-button @click=${():void=>{
              const payload:TLoginBackPayload = {detail:{saved:true},composed:true}
              this.dispatchEvent(new CustomEvent(TCustomEvents.LoginBack,payload))
            }}>
                <vaadin-icon icon="vaadin:arrow-left" slot="prefix"></vaadin-icon>
                Back
            </vaadin-button>
            <vaadin-button theme="primary" @click=${this.onLoginButtonClick}>Login
                <vaadin-icon icon="vaadin:arrow-right" slot="suffix"></vaadin-icon>
            </vaadin-button>
            <vaadin-menu-bar
                .items="${[{text:"More", children: [{ text: "Reset" },{ text: "Logout" }] }]}"
            ></vaadin-menu-bar>
        </footer>
        `
    }
    onLoginButtonClick():void {
      console.log("Login")  
    }
}
declare global { interface HTMLElementTagNameMap { "page-login": PageLogin}}