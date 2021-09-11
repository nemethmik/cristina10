import { IStore,TStoreEventHandler} from "./istore"
// This is a very tricky solution, actually a well documented practical application of JavaScript closures 
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#emulating_private_methods_with_closures
/*
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
export const store2 = createStore()
*/
// This class solution is a lot cleaner, trick-free, traditional OO implementation
class Store implements IStore {
  private count = 0
  private subscribers: Array<TStoreEventHandler> = []
  public readonly orchids = [1,2,3,4,5,6,7].map(i => `orchids/orchid${i}.jpg`)
  private image = this.orchids[0]
  getCount():number {return this.count}
  getImage():string {return this.image}
  incrementCount():void {
    this.count += 1
    this.subscribers.forEach(s => s("CountIncremented"))
  }
  setImage(img:string):void {
    this.image = img
    this.subscribers.forEach(s => s("ImageSet"))
  }
  // subscribe():void { //If you tried to add arg:number then the compiler would immediately chime in.
  //   console.log("A no argument function is always allowed in TypeScript even when strictFunctionTypes is enabled")
  // }
  subscribe(fn:TStoreEventHandler):void {
      this.subscribers.push(fn)
  }
}
export const store = new Store()
