import { TAluno, TTreino } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";

export default class SearchWorkouts
{
    constructor(
        public periodizacoesRepository:Repository<Treino, TTreino>,
        public alunoRepository:Repository<Aluno, TAluno>
    ){}
}