import { Aluno, Treino } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class SearchWorkouts
{
    constructor(
        public periodizacoesRepository:Repository<Treino>,
        public alunoRepository:Repository<Aluno>
    ){}
}