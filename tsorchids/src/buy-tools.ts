import {IStore,TStoreEventType} from "./istore"

export const createBuytools = (el:HTMLElement,store:IStore):void => {
    const ADDTOCART = "add-to-cart"
    const ORCHIDIMAGE = "orchid-image"
    el.innerHTML = `
    <div style="margin: 2em;" class="mui-panel mui--text-center">
        <div class="mui--text-headline">Buy Tools</div>
        <div class="mui-divider"></div>
        <img id=${ORCHIDIMAGE} style="margin-top: 1em; margin-bottom: 1em; height: 200px"></img>
        <div class="mui-divider"></div>
        <button class="mui-btn mui-btn--accent" style="width: 100%;" id=${ADDTOCART}>Add</button>
    </div>
    `
    document.getElementById(ADDTOCART)!.addEventListener("click", () => {
        store.incrementCount()
    }); //This semicolon is required since the next line contains an opening function-call parenthesis
    (document.getElementById(ORCHIDIMAGE)! as HTMLImageElement).src = store.getImage()
    //store.subscribe(()=>{console.log("hello")}) //This is OK, since a no argument function wouldn't break the application
    //store.subscribe((arg1:number) => console.log(arg1)) // This is rejected when strictFunctionTypes is enabled in tsconfig
    //Why it is allowed? see https://www.typescriptlang.org/tsconfig#strictFunctionTypes
    store.subscribe((ev:TStoreEventType) => {
        if(ev == "ImageSet") (document.getElementById(ORCHIDIMAGE)! as HTMLImageElement).src = store.getImage()
    })

}