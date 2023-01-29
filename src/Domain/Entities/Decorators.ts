export const Print = () => {
    return (target: Object, key: keyof Object) => {
        let val = target[key as keyof Object]
        const getter = () => {
            return val;
        } 

        const setter = (next:any) => {
            console.log('updating password...')
            val = next
        }

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        })
    }
}