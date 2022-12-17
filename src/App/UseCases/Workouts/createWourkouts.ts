import { Aluno, Exercicio, Personal, Treino } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class CreateWorkout 
{
    constructor(
        public exerciseRepository:Repository<Exercicio>,
        public workoutRepository:Repository<Treino>,
        public alunoRepository:Repository<Aluno>,
        public PersonalRepository:Repository<Personal>
    ){}
}