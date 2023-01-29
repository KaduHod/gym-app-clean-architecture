import { PK } from "../../App/Repositories/Repository";
import { TExercicio, TMuscle } from "./Entities";

export default class Muscle 
    implements TMuscle
{
    constructor(
        public name:string,
        public image:string,
        public id:PK | null,
        public exercises:TExercicio[] | null
    ){}
    
}