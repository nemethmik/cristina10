import {store} from "./store.js"
import {createHeader} from "./header.js"
import {createFooter} from "./footer.js"
import {createOrchids} from "./orchids.js"
import {createBuytools} from "./buy-tools.js"

createHeader(document.getElementById("header")!,store)
createFooter(document.getElementById("footer")!)
createOrchids(document.getElementById("orchids")!,store)
createBuytools(document.getElementById("buy-tools")!,store)