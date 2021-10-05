import bootstrapcss from "bootstrap/dist/css/bootstrap.min.css" //This is for Shadow DOM
import {LitElement, unsafeCSS} from "lit"
import {makeAutoObservable} from "mobx"

export type TPerson = {
    firstName: string,
    lastName: string,
    address: {
        street: string,
        city: string,
        state: string,
        zip: string,
        country: string,
        phone: string
    },
    email: string
  }
export interface IBootPeople extends HTMLElement {
loadData(remote:boolean):Promise<void>
}
  
export class BootBase extends LitElement {
  static styles = [unsafeCSS(bootstrapcss)]
}

class AppStore {
    constructor() {
        makeAutoObservable(this)
    }
}
export const appStore = new AppStore()