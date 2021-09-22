//import './style.css'
import {html,render,css,LitElement} from "lit"
import {customElement} from "lit/decorators.js"
import '@vaadin/vaadin-app-layout/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-icon/vaadin-icon';
//import '@vaadin/vaadin-icons/vaadin-iconset';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/vaadin-tabs/vaadin-tab';
import '@vaadin/vaadin-tabs/vaadin-tabs';


render(html`<jw-app></jw-app>`,document.querySelector<HTMLDivElement>('#app')!)
/**
 * Application component
 */
@customElement("jw-app")
export class App extends LitElement {
  render() {
    return html`
      <!-- vaadin-icon icon="lumo:phone"></vaadin-icon -->
      <vaadin-app-layout>
        <h1 slot="navbar">MyApp</h1>
        <vaadin-tabs slot="navbar touch-optimized" theme="minimal equal-width-tabs">
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="lumo:phone"></vaadin-icon>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="lumo:phone"></vaadin-icon>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="lumo:user-heart"></vaadin-icon>
            </a>
          </vaadin-tab>
          <vaadin-tab>
            <a tabindex="-1">
              <vaadin-icon icon="lumo:package"></vaadin-icon>
            </a>
          </vaadin-tab>
        </vaadin-tabs>
        <div class="content">
          <h2>View title</h2>
          <p>View content</p>
        </div>
      </vaadin-app-layout>
      `
  }
}
