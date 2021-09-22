# cristina10
A multi-project (aka mono) repo for TypeScript web server, front-end and database applications (Chirichella)

## jobwatch
Based on the JQuery Mobile implementation's design here is a more modern Li/Vaadin/Vite/TS version.
How the project was initialized:
- in the repo root folder `npm init vite` then select *vanilla-ts* the cd into *jobwatch*
- `npm install` in the jobwatch project folder to install dev dependencies then remember to change target to ES2021 and comment out useDefineForClassFields in tsconfig, otherwise Lit will not work.
- `npm install lit`
- [App Layout](https://vaadin.com/docs/latest/ds/components/app-layout)
  - `npm i @vaadin/vaadin-app-layout @vaadin/vaadin-icon @vaadin/vaadin-tabs @vaadin/vaadin-icons`

 **Unfortunately this is not willing to work at all, I'll create a separate project monica6 for an isolated example to request help from the Vaadin community**

## vaadings (Getting Started with Vaadin)
[Vaadin Fusion](https://vaadin.com/docs/latest/fusion/overview) was implemented with JavaScript on top of LitElement, but it comes with full TzpeScript tzpe definitions, too.
[How to use Web Components, 2018 Dec 12](https://vaadin.com/learn/tutorials/using-web-components) and accompanying videos are to be followed first:
- [How to use Web Components in a JavaScript project](https://youtu.be/88Sa-SlHRxk) 

Since the project is using package libraries, a bundler is required; so, I decided to use ViteJS, since it has a template for Lit projects, exactly as I did in my [elena14](https://github.com/nemethmik/elena14), but this Vite lit-element template is to make library projects for web components, and not applications. For deployable regular web applications use the **vanilla-ts** template.
Project setup is then
- Run **npm init vite** on the repo root folder to craete *vaadings* subfolder
  - cd vaadings and npm install
- Copy *.eslintrc.json* from the other project
  - npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
- **npm install @vaadin/vaadin-button @vaadin/vaadin-grid @vaadin/vaadin-text-field** for the example app as suggested in [How to use Web Components in a JavaScript project](https://youtu.be/88Sa-SlHRxk)

## tswebcomp
After the *tsorchids* remake, I started experimenting with web components foloowing [JH Web Components Custom Elements, Templates and the Shadow DOM, 2019](https://youtu.be/_Tr9ZcXcMjQ) and the subsequent two parts.

Here is my eloquent explanation video [Web Component (Custom Element) Fundamentals with TypeScript](https://youtu.be/RjpoiFdEBWs).

I kept the *tsorchids* project, and I created a new folder *tswebcomp*. This project had only *src/index.ts* and *dist/index.html* 
I copied the files package.json (changed the project name and description), .eslintrc, tsconfig.json and .gitignore. 
I changed *.gitignore*, not to exclude the entire *dist* folder, just ignore `dist/*.js`

After cloning, the steps are exactly the same as in *tsorchids* project, but the project root folder is *tswebcomp*, of course.

For the full explanation of the videos, firts JHerr's then mine.
Here are the main points when working with web components:
- What is the difference between an open and closed shadow root? Here is a nice explanation [open-vs-closed-shadow-dom](https://blog.revillweb.com/open-vs-closed-shadow-dom-9f3d7427d1af)
  - The short answer is that with close shadow root, you should use the object returned by the *attachShadow* function and use that for building the shadow DOM.
- *Slots* work only in the shadow DOM.
- You can build custom elements (aka web components) with Bootstrap, too, without using the shadow DOM, but then you will not have slots and all the styling is cascading through the components in the elements defined in the innerHTML of the custom element.
- You cannot use *input* elements from the shadow DOM in combination with an outside *form*.
  - You have to add *fordata* event listener and then : (for more details see [formdata-event example](https://glitch.com/edit/#!/formdata-event?path=custom-input.js%3A5%3A3))
  Apple browsers don't support fordata events. Fortnately Apple is not relevant for business applications, and Chrome is available on all Apple platforms.
    ```JavaScript
    handleFormData({formData}) {
      // add our name and value to the form's submission data if we're not disabled
      if (!this.input.disabled) {
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData
        formData.append(this.input.name, this.input.value);
      }
    }    
    // find the <form>, and attach the `formdata` listener
    connectedCallback() {
      this._form = this.findContainingForm();
      if (this._form) {
        this._form.addEventListener('formdata', this._handleFormData);
      }
    }
    // remove the `formdata` listener if we're removed
    disconnectedCallback() {
      if (this._form) {
        this._form.removeEventListener('formdata', this._handleFormData);
        this._form = null;
      }
    }
    ```
- All methods defined in the class (render, show, hide in our example) is fully accessible to the users from the web page.
- If your *attributeChangedCallback* is not fired, possibly you have forgotten to define the static *observedAttributes*
- Attributes are standard feature of every HTML element, and they can be accessed with *getAttribute* and *setAttribute*, but the browser will not generate any getter/setter for them automatically; this is your job to define getter/setter properties. You can have properties without attributes, and you can have attributes without properties, and you can link them as demonstrated in this example.
- Using the standard *template* element gives the possibility that the user can define and customize the template on the HTML page without interferring the layout, since the browser doesn't render at all a template; a template is meant tor the web component developers to be rendered with JavaScript.
See [Using_templates_and_slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots) 
A major limitation is that a template has no machinery to generate parts dynamically. You can use regular JavaScript template literals with the placeholder expressions to create the inner text of templates, but gives no HTML diffing virtual dom feature, unlike the brilliant lit-html.  
  - Slots work without templates, too. But, cloning a template is a lot faster than rendering a HTML string for hungreds of elements in a scrolling list for example.
- Event handler functions that are defined with the classic *method* way have to be bounded when added to an event listener. Event handlers defined with *lamda* syntax are automatically bounded to the *this* keyword of the class.
  - If your event handler doesn't fire, check the handler function definition syntax and binding.
- There is no such a thing as render callback function. 
- Here are the (lifecycle) callbacks:
  - constructor [Lifecycle Callbacks](https://levelup.gitconnected.com/creating-web-components-lifecycle-callbacks-5b6ffa48a8d5) suggest not to do any rendering and data fetching in the constructor it should be done in the *connectedCallback*
  - connectedCallback
  - disconnectedCallback
  - attributeChangedCallback
- As for *HTMLElementTagNameMap* see [typescriptlang/dom-manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html) 
When a lit-element project is created with Vite (see my elena14/elana14lit branch), a declaration section is generated at the bottom of the web component class TS file. 
  ```TypeScript
  declare global {
      interface HTMLElementTagNameMap {
        "my-product": MyProduct
      }
  }
  ```
- Instead of regular events, dispatch [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) and you can add data in the constructor
  ```JS
        const productDetails:TProductDetails = {name:this.name, price:854.5}
        this.dispatchEvent(new CustomEvent("buy",{detail:productDetails}))  
        //And the user can listen to that event like so:
        myProduct().addEventListener("buy",(e)=>alert('Buy Me, Please!' + JSON.stringify(e.detail)))
  ```

## tsorchids
This is a remake of [Jack Herrington Javascript Modules in detail - Part 1](https://youtu.be/mMB8DNLotDs)

After cloning, 
- *cd tsorchids* this is the project home/root folder
- *npm install* to install the npm packages based on package.json
- *npm start* to start tsc --watch to compile-watch the TypeScript sources into the dist folder. 
- in another terminal window *npm run s4000* to start servor upon dist/index.html, or you can use Live Server, too.

Here is my quite lengthy explanation of almost every line 
[No-framework, no-bundler TypeScript WebApplication Development 01 JH's Orchids Sample Remake](https://youtu.be/9lM5e983mnQ).

The basic idea is to use only **tsc** for building the application.
Here are the steps how to initialize the project. See my other projcet [alessia8](https://github.com/nemethmik/alessia8) how to configure ESLint for TypeScript
- npm init
- npm i -D typescript eslint
- npx tsc --init
    - "target": "ESNext", 
    - "module": "ESNext",
    - "rootDir": "./src",
    - "outDir": "./dist", 
    - "inlineSourceMap": true,
    - **"strictFunctionTypes": true,** is terribly important, never leave it disabled.
- npx eslint --init
    - How would you like to use ESLint? · problems    
    - What type of modules does your project use? · esm
    - Which framework does your project use? · none
    - Does your project use TypeScript? · No / Yes
    - Where does your code run? · browser
    - What format do you want your config file to be in? · JSON
    - The config that you've selected requires the following dependencies:    
        - @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
        - Would you like to install them now with npm? · No / Yes
- Add these TypeScript rules to .eslintrc:
    ```
    "@typescript-eslint/no-non-null-assertion":"off",
    "@typescript-eslint/explicit-function-return-type": "error", 
    "@typescript-eslint/explicit-module-boundary-types": ["warn", {"allowArgumentsExplicitlyTypedAsAny":true}], 
    "@typescript-eslint/no-explicit-any":"warn", 
    "quotes": ["error","double",{ "allowTemplateLiterals": true}], 
    "@typescript-eslint/semi": ["error", "never"], 
    "@typescript-eslint/ban-ts-comment": ["warn"]
    ```
- I applied **npx eslint src --fix** to fix the fixable issues on the source files I copied from [JHerr's repo](https://github.com/jherr/orchids-esm-part-1).

## Closures in JavaScript/TypeScript

The original implementation by JH was based on closures.
Here all the local variables count, subscribers, orchids and image were referenced in the functions defined for the IStore object, all of these variables are actually created on the heap and they are kept alive with reference counting.  
The *store* (global) object is created at the end of the module `export const store = createStore()`, so the local variables referenced by these functions are kept forever. 
The function *createStore* with its local variables behaves like an object constructor.
See [emulating_private_methods_with_closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#emulating_private_methods_with_closures)
```TypeScript
const createStore = ():IStore => {
  let count = 0
  const subscribers: Array<TStoreEventHandler> = []
  const orchids = [1,2,3,4,5,6,7].map(i => `orchids/orchid${i}.jpg`)
  let image = orchids[0]
  return {
    getCount: ():number => count,
    getImage: ():string => image,
    incrementCount: ():void => {
      count += 1
      subscribers.forEach(s => s("CountIncremented"))
    },
    setImage: (img:string):void => {
      image = img
      subscribers.forEach(s => s("ImageSet"))
    },
    subscribe: (fn:TStoreEventHandler):void => {
      subscribers.push(fn)
    },
    orchids,
  }
}
export const store = createStore()
```
When event listener functions are created they are kept alive until the object to which they are registered is live.
So, the *createBuytools* for example has two event listener functions and both of them references the store object that the function is received as incoming parameter.
These anonymous functions are linked to the *button (addEventListener)* object and the *store (subscribe)* object.
Since these functions reference the *store* object it is a closure again. The store object could have been a local variable, too, in this regard it doesn't matter.
```TypeScript
export const createBuytools = (el:HTMLElement,store:IStore):void => {
    ...
    document.getElementById(ADDTOCART)!.addEventListener("click", () => {
        store.incrementCount()
    }); 
    store.subscribe((ev:TStoreEventType) => {
        if(ev == "ImageSet") (document.getElementById(ORCHIDIMAGE)! as HTMLImageElement).src = store.getImage()
    })
}
``` 
## Loading Modules Dinamically Implementing a Micro FrontEnd (Micro-FE) Architecture
This second part is based on [JH: Javascript Modules in detail - Part 2](https://www.youtube.com/watch?v=d7SL7dckSf0).
[Servor](https://www.npmjs.com/package/servor) is used to mimic the multiple miro-FE provider concept running on different ports.
Servor has hot reload as well as built in CORS enabled without any configuration, which is very important for testing multi-site/multi-server applications. 
- Make sure to navigate to the home folder (tsorchid) of the project (not the root folder of the mult-project repo)
- **npx servor dist index.html 4000 --browse --reload** starts *servor* on the *dist* folder opening *index.html* on port *4000* opening a browser and reloading when any file is changed. 
- I added a script command to *package.json*, too `"s4000":"npx servor dist index.html 4000 --browse --reload"` using **npm run s4000**

Eventually, I lost interest since this kind of JavaScript source module distribution (federation) might primarily be interesting for wbesite, portal builders. Business applications are communicationg via API's and for single signon with HTTP redirections. On the other hand, having a business app, production data collection, warehousing mobile scanner, and the application manufacturer could implement data validations, user interface composition with this dynamic JavaScript module loading. Yep, definitely thhis would be very important for a major out-of-the-box standard project. 
The configuration details should have been stored in a separate JavaScript module, which is not part of the standard application deplyment, so every time a new version is delivered, the configuration JavaScript module would be kept as is.
In a cloud service scenario each tenant could have its configuration data table with the urls for the custom modules; but, in this scenario allowing a customer to inject its own custom JavaScript code would be a major risk; so this would work best in a customer-dedicated deployment, where the standard application would be deployed on the customers server or virtual machine in a cloud.
So, this [github.com/jherr/orchids-esm-part-2](https://github.com/jherr/orchids-esm-part-2) could be vey useful in case I decided to start a major
project with Miro-FE.

In the index.html he used `<component src="http://localhost:4002/header.js"></component>` and
`<component src="http://localhost:4002/banner.js" text="Buy these orchids!"></component>` these *component* tags were just arbitrary names, 
these are not custom elements, they have no semantics, just like spans, sections or divs. They can even have attributes, but the browser doesn't do anything with these attributes the *src* on a *component* element means nothing to the browser: it's the application that has to handle these attributes.
Here is a function that actually loads the JavaScript modules defined in the src attributes in these arbitraryly invented *component* elements:
```JavaScript
export const loadComponents = () => {
  document.querySelectorAll('component').forEach(el => {
    const props = {};
    Array.from(el.attributes).forEach(({ name, value }) => {
      props[name] = value;
    });
    import(el.attributes.src.value)
      .then((mod) => {
        mod.default(el, props);
      });
  });
};
```
It collects all the attributes into an object `const props = {}`; note the syntax he used to create member in the object with the array syntax `props[name] = value`.
Thereafter, the import async function was used to load the JavaScript module. He could have used the async/await syntax:
```JavaScript
    const mod = await import(el.attributes.src.value)
    mod.default(el, props)
```
He used the default function passing all the attribute object. This is a great example why it is meaningful to define a default function.
This is a pretty neat dynamic custom module loader implementation.
What is not really elegant in the solution is the hard-coded URL's in the component JavaScript codes
`import { getStore } from 'http://localhost:4001/framework.js'`

## Other Videos Worth Watching
- 
- [JH: Web Components for Micro Frontends](https://www.youtube.com/watch?v=XUtCnA9WEgQ)
    [The github repo Product Details Page for the video](https://github.com/jherr/web-components-pdp/tree/master/components)