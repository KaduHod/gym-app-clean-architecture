import { TAluno, TExercicio, TPersonal, TTreino } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class CreateWorkout 
{
    constructor(
        public exerciseRepository:Repository<Exercicio, TExercicio>,
        public workoutRepository:Repository<Treino, TTreino>,
        public alunoRepository:Repository<Aluno, TAluno>,
        public PersonalRepository:Repository<Personal, TPersonal>
    ){}
}