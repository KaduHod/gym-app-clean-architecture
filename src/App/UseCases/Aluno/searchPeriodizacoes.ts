import { Periodizacao, TAluno } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";

export default class SearchPeriodizacoes
{
    constructor(
        public periodizacoesRepository:Repository<Periodizacao, TPeriodizacao>,
        public alunoRepository:Repository<Aluno, TAluno>
    ){}
}