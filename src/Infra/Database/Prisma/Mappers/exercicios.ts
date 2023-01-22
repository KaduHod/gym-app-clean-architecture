export default {
    toArrayGraphQL(exercises:any[] | any)
    {
        if(Array.isArray(exercises)){
            return exercises.map(({muscles, ...exercise}:any) => {
                return {...exercise, muscles: muscles.map(({muscle}:any) => muscle)}
            })
        }
        const {muscles, ...exercise} = exercises
        return {...exercise, muscles: muscles.map(({muscle}:any) => muscle)}
    }
}