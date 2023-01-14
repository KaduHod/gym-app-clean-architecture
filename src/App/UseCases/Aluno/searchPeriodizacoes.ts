import { Periodizacao, TAluno } from "../../../Domain/Entities/Entities";
import { AlunoRepository, Repository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";

export default class SearchPeriodizacoes
{
    constructor(
        public periodizacoesRepository:Repository,
        public alunoRepository:AlunoRepository
    ){}
}