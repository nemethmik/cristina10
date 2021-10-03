export type TProductDetails = {
    name: string,
    price: number,
}
// function changeProduct():void {
//     console.log("Change Product Clicked")
//     document.querySelector("my-product")?.setAttribute("name","iPhone7")
// }
// document.getElementById("changeproduct")?.addEventListener("click",changeProduct)

class MyProduct extends HTMLElement {
    // static t2 = document.createElement("template")
    // This syntax doesn't seem to work in browsers :-()
    // static {
    //     MyProduct.t2.innerHTML = `
    //     <style>h2{color:red;}</style>
    //     <h2>Hello!</h2>
    //     ` 
    // }
    static get observedAttributes():string[] {return ["name", "shadow"]}
    get name():string {return this.getAttribute("name")!}
    set name(val:string) {this.setAttribute("name",val)}
    get shadow():boolean {return this.getAttribute("shadow") != null && this.getAttribute("shadow") != "false"}
    get root():ShadowRoot | HTMLElement {
        return this.shadowRoot ? this.shadowRoot as ShadowRoot : this
    }
    constructor(){
        super()
        if(this.shadow) this.attachShadow({mode:"open"})
        // console.log("t2",MyProduct.t2.content)
        // this.shadowRoot!.innerHTML = `
        // <style>h2{color:red;}</style>
        // <h2>Hello! ${this.getAttribute("name")}</h2>
        // `
        // this.shadowRoot?.appendChild(template.content.cloneNode(true))
    }
    // Event handler functions defined this way should be bound when added to the event listener.
    // buyMeButtonClick(ev:Event):void {
    //     console.log(`Button ${(ev.target as HTMLButtonElement).innerText} clicked`)
    //     this.dispatchEvent(new Event("buy",{}))
    // }
    // Lambda-syntax event handler functions are automatically bound to the class, no need to bind them
    buyMeButtonClick = (ev:Event):void => {
        console.log(`Button ${(ev.target as HTMLButtonElement).innerText} clicked`)
        const productDetails:TProductDetails = {name:this.name, price:854.5}
        this.dispatchEvent(new CustomEvent("buy",{detail:productDetails}))
    }
    connectedCallback():void {
        // Unlike in LitElement no connectedCallback defined in HMLElement :-)
        //super.connectedCallback()
        console.log("connectedCallback:in",this.getAttribute("name"))
        //this.shadowRoot!.innerHTML = templString //defined above the class.
        // A template can come from the HTML page, where it is under the complete control of the user.
        let template = document.getElementById("my-product-template") as HTMLTemplateElement
        if(!template) {
            // Or, the template can be defined as part of the custom element.
            template = document.createElement("template")
            template.innerHTML = /*html*/`
                <!-- style>h2,button{color:red;}</style -->
                <h2>Hello!</h2>
                <div><slot></slot></div>
                <div>The price is <slot style="color:green;" name="price"></slot> and is really great</div>
                <button>Buy Me</button>
            ` 
        }
        // Using Template is the more standard way
        const myProductStyles = document.getElementById("my-product-style")
        // console.log("connectedCallback:myProductStyles",myProductStyles.innerHTML)
        if(myProductStyles) this.root.appendChild(myProductStyles.cloneNode(true))
        this.root.appendChild(template.content.cloneNode(true))
        // const rootNode = this.root.getRootNode()
        // console.log("connectedCallback:getRootNode",rootNode)
        // //if(rootNode.style) rootNode.style = myProductStyles.textContent
        // const childNodes = Array.from(this.shadowRoot!.childNodes) 
        // console.log("connectedCallback:childNodes",childNodes)      
        
        //Binding is very important for method functions otherwise the function will be attached to the button not to this class
        //this.shadowRoot?.querySelector("button")?.addEventListener("click",this.buyMeButtonClick.bind(this))
        //No need when function is defined with lambda syntax
        this.root.querySelector("button")?.addEventListener("click",this.buyMeButtonClick)
        //this.shadowRoot?.querySelector("button")?.addEventListener("click",()=>this.dispatchEvent(new Event("buy",{})))
        this.render()
        console.log("connectedCallback:out",this.getAttribute("name"))
    }
    disconnectedCallback():void { // I don't see why it is important?
        this.root.querySelector("button")?.removeEventListener("click",this.buyMeButtonClick)
    }
    render():void { // Not a callback, this is just my function
        const h2 = this.root.querySelector("h2")
        // if(h2) h2.innerText += this.getAttribute("name")
        //const n = this.getAttribute("name")
        if(h2 /*&& n*/) h2.innerText += this.name
    }
    attributeChangedCallback(name:string,oldValue:string,newValue:string):void {
        console.log(`attributeChangedCallback ${name} "${oldValue}" "${newValue}"`)
        if(name == "shadow") {
            if(newValue == "false" && oldValue == "true") console.warn("Cannot remove a shadow root")
        }
        //if(name == "name") 
            this.render()
        //}
        // No such a function to call back
        //super.attributeChangedCallback(name,oldValue,newValue)
    }
    hide():void {
        this.style.display = "none"
    }
    show():void {
        this.style.display = "block"
    }
}
window.customElements.define("my-product",MyProduct)

declare global {
    interface HTMLElementTagNameMap {
      "my-product": MyProduct
    }
}
