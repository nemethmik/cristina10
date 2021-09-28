import { LitElement, css, CSSResult } from "lit"
export const TCustomEvents = {ConfigDone: "configdone", LoginBack: "loginback", LoginLogin:"loginlogin"} as const
export type TConfigDonePayload = {detail:{saved:boolean},composed: true}
export type TLoginBackPayload = {detail:{saved:boolean},composed: true}

export class PageBase extends LitElement {
    static override get styles():CSSResult[] {return [css`
        section {
            display:flex;
            flex-direction:column;
            height: 82vh;
        }
        header {
            //background-color: #800020;
            display:flex;align-items:center;justify-content:center; 
        }
        footer{
            //background-color: #800020;
            display: flex; flex-flow: row; justify-content: center;
            position:fix; bottom:0;
        }
        main { 
            overflow-y:scroll;
            -webkit-overflow-scrolling:touch;
            display:flex; flex-direction:column;
            align-items: center;
        }
        label {
            font-family: var(--lumo-font-family);
            font-size: var(--lumo-font-size-m)
        }
        h1 {font-family:var(--lumo-font-family)}

      `]}
}
