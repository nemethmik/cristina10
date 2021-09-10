export type TStoreEventType = "ImageSet" | "CountIncremented"
export type TStoreEventHandler = (eventType:TStoreEventType)=>void
export interface IStore {
    getCount: () => number,
    getImage: () => string,
    incrementCount: () => void,
    setImage: (img:string) => void,
    // A no-argument function is always compatible with any functions even when strictFunctionTypes is enabled in tsconfig, since it wouldn't break the application
    // See https://www.typescriptlang.org/tsconfig#strictFunctionTypes  for some limitations
    subscribe: (fn:TStoreEventHandler) => void, //When image is changed or counter is incremented
    orchids:string[],
}
