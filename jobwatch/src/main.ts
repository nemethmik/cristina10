import {html,render} from "lit"
import "@vaadin/vaadin-app-layout/vaadin-app-layout"
import "@vaadin/vaadin-app-layout/vaadin-drawer-toggle"
import "@vaadin/vaadin-icon/vaadin-icon"
import "@vaadin/vaadin-icons/vaadin-iconset"
import "@vaadin/vaadin-tabs/vaadin-tab"
import "@vaadin/vaadin-tabs/vaadin-tabs"
import "@vaadin/vaadin-lumo-styles/color"
import "./my-mobileapp"

document.documentElement.setAttribute("theme", "dark")
const app = document.querySelector<HTMLDivElement>("#app")!
render(html`<my-mobileapp></my-mobileapp>`,app)

