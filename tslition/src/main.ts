import './style.css'
import {html,render} from "lit"

// Use matchMedia to check the user preference
window.matchMedia('(prefers-color-scheme: dark)');
toggleDarkTheme(true);
// Listen for changes to the prefers-color-scheme media query
//prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
// Add or remove the "dark" class based on if the media query matches
function toggleDarkTheme(shouldAdd:boolean):void {
  document.body.classList.toggle('dark', shouldAdd);
}

const app = document.querySelector<HTMLDivElement>('#app')!
render(html`
<ion-app>
  <ion-header>
    <ion-toolbar>
      <ion-title>Header</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <h1>Main Content</h1>
  </ion-content>

  <ion-footer>
    <ion-toolbar>
      <ion-title>Footer</ion-title>
    </ion-toolbar>
  </ion-footer>
</ion-app>
`,app)
