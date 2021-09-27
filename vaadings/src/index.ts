import "@vaadin/vaadin-button"
import "@vaadin/vaadin-grid"
import "@vaadin/vaadin-text-field"
import {GridElement} from "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-lumo-styles/all-imports"
import "@vaadin/vaadin-lumo-styles/utility"

window.addEventListener("load", () => {
  initUI()
})
type TPeople = {
  firstName: string,
  lastName: string,
}
function initUI():void {
  document.documentElement.setAttribute("theme", "dark") //Unfortunately, this doesn't change the application to dark 
  const firstNameField:HTMLInputElement = document.querySelector("#firstName")!
  const lastNameField:HTMLInputElement = document.querySelector("#lastName")!
  const addButton = document.querySelector("#addButton")
  const grid:GridElement = document.querySelector("#grid")! 

  let people:TPeople[] = [] 
  if(addButton) addButton.addEventListener("click", () => { 
      people = [ 
        ...people,
        {
          firstName: firstNameField?.value,
          lastName: lastNameField.value
        }
      ]
      if(grid) grid.items = people 
      firstNameField.value = "" 
      lastNameField.value = ""
    })
}