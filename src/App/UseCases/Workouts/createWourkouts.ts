import { AlunoRepository, PersonalRepository, Repository } from "../../Repositories/Repository";

export default class CreateWorkout 
{
    constructor(
        public exerciseRepository:Repository,
        public workoutRepository:Repository,
        public alunoRepository:AlunoRepository,
        public PersonalRepository:PersonalRepository,
    ){}
}