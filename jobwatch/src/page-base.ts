import { LitElement, css } from "lit"
export const TCustomEvents = {ConfigDone: "configdone", LoginBack: "loginback"} as const
export type TConfigDonePayload = {detail:{saved:boolean},composed: true}

export class PageBase extends LitElement {
    static styles = css`
        section {
            display:flex;
            flex-direction:column;
            height: 92vh;
        }
        header {
            background-color: #800020;
            display:flex;align-items:center;justify-content:center; 
        }
        footer{
            background-color: #800020;
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
      `
}
