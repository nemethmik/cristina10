import { html, LitElement, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"
import "@vaadin/vaadin-form-layout/vaadin-form-layout"
import "@vaadin/vaadin-text-field/vaadin-text-field"
import "@vaadin/vaadin-text-field/vaadin-password-field"
import "@vaadin/vaadin-checkbox/vaadin-checkbox"
import "@vaadin/vaadin-text-field/vaadin-integer-field"
import "@vaadin/vaadin-button"
//import { applyTheme } from "Frontend/generated/theme"
import { FormLayoutResponsiveStep } from "@vaadin/vaadin-form-layout/vaadin-form-layout"

@customElement("page-config")
class PageConfig extends LitElement {
//   protected createRenderRoot() {
//     const root = super.createRenderRoot()
//     // Apply custom theme (only supported if your app uses one)
//     applyTheme(root)
//     return root
//   }
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if layout's width exceeds 500px
    { minWidth: "500px", columns: 2 },
  ]
  render():TemplateResult {
    return html`
        <vaadin-vertical-layout theme="spacing" >
            <vaadin-form-layout .responsiveSteps=${this.responsiveSteps}>
                <vaadin-checkbox checked=true>HTTPS</vaadin-checkbox>
                <vaadin-text-field label="Version" readonly value="0.0.1"></vaadin-text-field>
                <!-- Stretch the username field over 2 columns -->
                <vaadin-text-field colspan=2 label="Domain"></vaadin-text-field>
                <vaadin-text-field label="Service"></vaadin-text-field>
                <vaadin-integer-field label="Port" value=443></vaadin-integer-field>
                <!--vaadin-password-field label="Password"> </vaadin-password-field -->
            </vaadin-form-layout>
            <!--vaadin-horizontal-layout theme="spacing">
                <vaadin-button theme="primary">Create account</vaadin-button>
                <vaadin-button theme="secondary">Cancel</vaadin-button>
            </vaadin-horizontal-layout-->
            <vaadin-horizontal-layout theme="spacing" style="justify-content: center">
                <vaadin-button theme="primary">Right
                    <vaadin-icon icon="vaadin:arrow-right" slot="suffix"></vaadin-icon>
                </vaadin-button>
                <vaadin-button>
                    <vaadin-icon icon="vaadin:ellipsis-dots-v" slot="prefix"></vaadin-icon>
                    More
                </vaadin-button>
            </vaadin-horizontal-layout>
        </vaadin-vertical-layout>
    `
  }
}
declare global { interface HTMLElementTagNameMap { "page-config": PageConfig}}