import { html, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"
import "@vaadin/vaadin-menu-bar/vaadin-menu-bar"
import "@vaadin/vaadin-text-field/vaadin-text-field"
import "@vaadin/vaadin-text-field/vaadin-password-field"
import "@vaadin/vaadin-checkbox/vaadin-checkbox"
import "@vaadin/vaadin-text-field/vaadin-integer-field"
import "@vaadin/vaadin-button"
import {PageBase, TCustomEvents, TConfigDonePayload} from "./page-base"

@customElement("page-config")
class PageConfig extends PageBase {
  render():TemplateResult {
    return html`
    <section>
        <header>
            <vaadin-button theme="primary">Config V01</vaadin-button>
            <!--
            <vaadin-button>
                <vaadin-icon icon="vaadin:cog" slot="prefix"></vaadin-icon>
                Settings
            </vaadin-button>
            -->
        </header>
        <main>
            <table>
                <tr>
                    <td></td>
                    <td><vaadin-checkbox checked=true><label>HTTPS<label></vaadin-checkbox></td>
                </tr>
                <tr>
                    <td><label>Host</label></td>
                    <td><vaadin-text-field placeholder=Host clear-button-visible></vaadin-text-field></td>
                </tr>
                <tr>
                    <td>Domain</td>
                    <td><vaadin-text-field clear-button-visible></vaadin-text-field></td>
                </tr>
                <tr>
                    <td>Service</td>
                    <td><vaadin-text-field clear-button-visible></vaadin-text-field></td>
                </tr>
                <tr>
                    <td>Port</td>
                    <td><vaadin-integer-field value=443 clear-button-visible></vaadin-integer-field></td>
                </tr>
            </table>            
        </main>            
    </section>
    <footer>
        <vaadin-button>
            <vaadin-icon icon="vaadin:exit" slot="suffix"></vaadin-icon>
            Exit
        </vaadin-button>
        <!--
        <vaadin-button>
            <vaadin-icon icon="vaadin:arrow-left" slot="prefix"></vaadin-icon>
            Back
        </vaadin-button>
        -->
        <vaadin-button theme="primary" @click=${this.onDoneButtonClick}>Done
            <vaadin-icon icon="vaadin:arrow-right" slot="suffix"></vaadin-icon>
        </vaadin-button>
        <!--
        <vaadin-button>
            <vaadin-icon icon="vaadin:ellipsis-dots-v" slot="prefix"></vaadin-icon>
            More
        </vaadin-button>
        -->
        <vaadin-menu-bar
            .items="${[{text:"More", children: [{ text: "Reset" },{ text: "Logout" }] }]}"
        ></vaadin-menu-bar>
    </footer>
    `
  }
  onDoneButtonClick():void {
    const payload:TConfigDonePayload = {detail:{saved:false},composed:true}
    this.dispatchEvent(new CustomEvent(TCustomEvents.ConfigDone,payload))
  }
}
declare global { interface HTMLElementTagNameMap { "page-config": PageConfig}}