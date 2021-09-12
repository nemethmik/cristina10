// function changeProduct():void {
//     console.log("Change Product Clicked")
//     document.querySelector("my-product")?.setAttribute("name","iPhone7")
// }
// document.getElementById("changeproduct")?.addEventListener("click",changeProduct)
const templString = /*html*/`
<style>h2,button{color:red;}</style>
<h2>Hello!</h2>
<div><slot/></div>
<div>The price is <slot style="color:green;" name="price"/> but worth every pennies</div>
<button>Buy Me</button>
` 
const template = document.createElement("template")
template.innerHTML = templString
export class MyProduct extends HTMLElement {
    // static t2 = document.createElement("template")
    // This syntax doesn't seem to work in browsers :-()
    // static {
    //     MyProduct.t2.innerHTML = `
    //     <style>h2{color:red;}</style>
    //     <h2>Hello!</h2>
    //     ` 
    // }
    static get observedAttributes():string[] {return ["name"]}
    get name():string {return this.getAttribute("name")!}
    set name(val:string) {this.setAttribute("name",val)}
    constructor(){
        super()
        this.attachShadow({mode:"open"})
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
        this.dispatchEvent(new Event("buy",{}))
    }
    connectedCallback():void {
        console.log("connectedCallback:in",this.getAttribute("name"))
        this.shadowRoot!.innerHTML = templString //defined above the class.
        // Using TEmplate is the more standard way
        // this.shadowRoot?.appendChild(template.content.cloneNode(true))
        //Binding is very important for method functions otherwise the function will be attached to the button not to this class
        //this.shadowRoot?.querySelector("button")?.addEventListener("click",this.buyMeButtonClick.bind(this))
        //No need when function is defined with lambda syntax
        this.shadowRoot?.querySelector("button")?.addEventListener("click",this.buyMeButtonClick)
        //this.shadowRoot?.querySelector("button")?.addEventListener("click",()=>this.dispatchEvent(new Event("buy",{})))
        this.render()
        console.log("connectedCallback:out",this.getAttribute("name"))
    }
    disconnectedCallback():void {
        this.shadowRoot?.querySelector("button")?.removeEventListener("click",this.buyMeButtonClick)
    }
    render():void { // Not a callback, this is just my function
        const h2 = this.shadowRoot?.querySelector("h2")
        if(h2) h2.innerText += this.getAttribute("name")
    }
    attributeChangedCallback(/*name:string,oldValue:string,newValue:string*/):void {
        console.log("attributeChangedCallback")
        //if(name == "name") 
            this.render()
        //}
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
