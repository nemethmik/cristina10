import bootstrapcss from "bootstrap/dist/css/bootstrap.min.css" //This is for Shadow DOM
import bootstrapicons from "bootstrap-icons/font/bootstrap-icons.css"
import {LitElement, unsafeCSS, TemplateResult} from "lit"
import {makeAutoObservable} from "mobx"

export const TPeopleEvent = "PeopleEvent"
//This is a discriminated union type definition for a reducer-like function 
//with type as the common field followed by the payload type
export type TPeopleActions = 
    {type: "Save", person: TPerson} //Save the data after being edited 
  | {type: "Edit", id: number} //Open a dialog box for the user to modify the data
  | {type: "Load", numberOfPeopleLoaded: number}
  | {type: "Delete", id: number}
  | {type: "Add", todo: TPerson} 
export function dispatchPeopleEvent(el:HTMLElement,detail:TPeopleActions):void {
  el.dispatchEvent(new CustomEvent(TPeopleEvent,{detail,composed:true}))
}

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
  static styles = [unsafeCSS(bootstrapcss),unsafeCSS(bootstrapicons)]
}

class AppStore {
    private _people:TPerson[] = []
    get people():TPerson[] {return [...this._people]}
    get numberOfPeople():number {return this._people.length}
    peopleMap(f:(p:TPerson)=>TemplateResult):TemplateResult[] {
        return this._people.map(f)
    }
    constructor() {
        makeAutoObservable(this)
    }
    public async loadData(remote = true,notificationVia:HTMLElement | null = null):Promise<void> {
        this.setPeople([])
        //await new Promise((r) => setTimeout(r, 1000)) // This is just a delayer to simulate long running tasks
        const endpoint = remote ? "https://demo.vaadin.com/demo-data/1.0/people?count=200" : "./people.json"
        this.setPeople((await (await fetch(endpoint)).json()).result)
        if(notificationVia) {
            dispatchPeopleEvent(notificationVia,{type:"Load",numberOfPeopleLoaded: this.numberOfPeople})
        }
    }
    setPeople(people:TPerson[]):void {this._people = people}
}

export const appStore = new AppStore()