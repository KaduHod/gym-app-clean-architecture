import { TAluno, TPersonal } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";

export default class HirePersonal
{
    constructor(
        public personalRepository:Repository<Personal, TPersonal>,
        public alunoRepository:Repository<Aluno, TAluno>
    ){}
}