import { TAluno } from "../../../Domain/Entities/Entities";
import { AlunoRepository, Repository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";

export default class SearchWorkouts
{
    constructor(
        public periodizacoesRepository:Repository,
        public alunoRepository:AlunoRepository
    ){}
}