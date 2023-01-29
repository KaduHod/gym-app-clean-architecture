import { PK } from "../../App/Repositories/Repository";
import { TExercicio, TExerciseMuscle } from "./Entities";

export default 
    class Exercise 
    implements TExercicio
{
    public id:PK | null
    public name:string
    public force:string
    public link:string | null
    public execution:string | null

    constructor(
        attrs:TExercicio,
        public muscles?:TExerciseMuscle[] | null
    ){
        this.id = attrs.id ?? null
        this.name = attrs.name
        this.force = attrs.force
        this.link = attrs.link ?? null 
        this.execution = attrs.execution ?? null
    }  
    
    
    public async setMuscles(muscles:TExerciseMuscle[])
    {
        this.muscles = muscles
    }
}