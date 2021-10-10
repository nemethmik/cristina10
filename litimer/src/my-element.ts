import { html, css, LitElement,TemplateResult } from 'lit'
import { customElement, property, } from 'lit/decorators.js'
// npm install mobx @adobe/lit-mobx 
import {MobxReactionUpdate} from "@adobe/lit-mobx"
import "./my-timer" 
import {timerController} from "./my-timer" 

@customElement('my-element')
export class MyElement extends MobxReactionUpdate(LitElement) {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `
  @property() name = 'World'
  @property({ type: Number }) count = 0
  override render():TemplateResult {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <slot name=before>Default Impl of Slot named before</slot>
      <button @click=${()=>this.count++} part="button">
        Click Count: ${this.count}
      </button>
      <button @click=${() => timerController.run ? timerController.stop() : timerController.start()}>
        ${timerController.run ? `Stop` : `Run`}
      </button>
      <my-timer></my-timer>
      <slot></slot>
      <my-timer></my-timer>
    `
  }
}
declare global {interface HTMLElementTagNameMap {'my-element': MyElement}}
/*
      <button @click=${()=> timerController.run ? timerController.stop() : timerController.start()}>
        ${timerController.run ? `Stop` : `Run`}
      </button>

*/