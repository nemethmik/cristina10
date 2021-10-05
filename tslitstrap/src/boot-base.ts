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
  
export class BootBase extends LitElement {
  static styles = [unsafeCSS(bootstrapcss)]
}

class AppStore {
    people:TPerson[] = []
    constructor() {
        makeAutoObservable(this)
    }
    public async loadData(remote = true):Promise<void> {
        this.people = []
        //await new Promise((r) => setTimeout(r, 1000)) // This is just a delayer to simulate long running tasks
        const endpoint = remote ? "https://demo.vaadin.com/demo-data/1.0/people?count=200" : "./people.json"
        this.people = (await (await fetch(endpoint)).json()).result
      }
    }
export const appStore = new AppStore()