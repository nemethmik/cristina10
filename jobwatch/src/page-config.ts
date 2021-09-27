import { html, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"
import "@vaadin/vaadin-menu-bar/vaadin-menu-bar"
import "@vaadin/vaadin-text-field/vaadin-text-field"
import "@vaadin/vaadin-text-field/vaadin-password-field"
import "@vaadin/vaadin-checkbox/vaadin-checkbox"
import {CheckboxElement} from "@vaadin/vaadin-checkbox"
import "@vaadin/vaadin-text-field/vaadin-integer-field"
import "@vaadin/vaadin-button"
import "@vaadin/vaadin-lumo-styles/typography"

import {PageBase, TCustomEvents, TConfigDonePayload} from "./page-base"

@customElement("page-config")
class PageConfig extends PageBase {
    // static override get styles():CSSResult[] {
    //     return [...super.styles, 
    //         css`h1 {font-family:var(--lumo-font-family)}`,
    //     ]
    // } 
    render():TemplateResult {
        return html`
        <section>
            <header>
                <h1>Config v01</h1>
            </header>
            <main>
                <table>
                    <tr>
                        <td></td>
                        <td>
                            <vaadin-checkbox checked=true><label>HTTPS<label></vaadin-checkbox>
                            <vaadin-checkbox @change=${(e:Event):void => {
                                if((e.currentTarget as CheckboxElement).checked) {
                                    console.log("Set to dark")
                                    document.documentElement.setAttribute("theme", "dark")
                                } else {
                                    console.log("Set to light")
                                    document.documentElement.removeAttribute("theme")
                                }
                            }}><label>Dark<label></vaadin-checkbox>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Host</label></td>
                        <td><vaadin-text-field placeholder="tiva11" clear-button-visible></vaadin-text-field></td>
                    </tr>
                    <tr>
                        <td>Domain</td>
                        <td><vaadin-text-field placeholder="azurewebsites.net"  clear-button-visible></vaadin-text-field></td>
                    </tr>
                    <tr>
                        <td>Service</td>
                        <td><vaadin-text-field placeholder="jobwatch" clear-button-visible></vaadin-text-field></td>
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