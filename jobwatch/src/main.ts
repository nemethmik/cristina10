import {html,render} from "lit"
import "@vaadin/vaadin-lumo-styles/color"
import "@vaadin/vaadin-lumo-styles/all-imports"
import "@vaadin/vaadin-lumo-styles/utility"
import "./my-mobileapp"

document.documentElement.setAttribute("theme", "dark") //Unfortunately, this doesn't change the application to dark 
const app = document.querySelector<HTMLDivElement>("#app")!
render(html`<my-mobileapp></my-mobileapp>`,app)

