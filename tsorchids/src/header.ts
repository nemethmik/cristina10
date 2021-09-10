import {IStore,TStoreEventType} from "./istore"
export const createHeader = (el:HTMLElement,store:IStore):void => {
    const COUNTID = "count"
    el.innerHTML = `
    <header class="mui-appbar mui--z1">
    <div class="mui-container">
        <table width="100%">
        <tr class="mui--appbar-height">
            <td class="mui--text-title">ESM Micro-FE</td>
            <td class="mui--text-right">
            Cart Count: <span id="${COUNTID}"></span>
            </td>
        </tr>
        </table>
    </div>
    </header>
`
  const update = (ev:TStoreEventType):void => {
    if(ev == "CountIncremented") document.getElementById(COUNTID)!.innerText = store.getCount().toString()
  }
  store.subscribe(update)
  update("CountIncremented")
}