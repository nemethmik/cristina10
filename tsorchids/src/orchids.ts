import {IStore} from "./istore"

export const createOrchids = (el:HTMLElement,store:IStore):void => {
    const ORCHIDSELECT = "orchid-select"
    const html = `
    <div class="mui-container-fluid" style="margin: 2em;">
        <div class="mui-row">
            ${store.orchids.map(url =>
            `
                <div class="mui-col-md-4" style="padding: 1em;">
                <img class=${ORCHIDSELECT} style="max-height:200px" src="${url}" />
                </div>
            `).join("")}
        </div>
    </div>
    `
    el.innerHTML = html
    document.querySelectorAll(`.${ORCHIDSELECT}`).forEach(img => {
        img.addEventListener("click", () => {
            //store.setImage(img.attributes.src.value)
            store.setImage((img as HTMLImageElement).src)
    })
  })
}