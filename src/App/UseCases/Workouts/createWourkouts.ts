import { Repository } from "../../Repositories/Repository";

export default class CreateWorkout 
{
    constructor(
        public exerciseRepository:Repository,
        public workoutRepository:Repository,
        public alunoRepository:Repository,
        public PersonalRepository:Repository,
    ){}
}