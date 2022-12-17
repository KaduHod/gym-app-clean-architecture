import { Aluno, Periodizacao } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class SearchPeriodizacoes
{
    constructor(
        public periodizacoesRepository:Repository<Periodizacao>,
        public alunoRepository:Repository<Aluno>
    ){}
}