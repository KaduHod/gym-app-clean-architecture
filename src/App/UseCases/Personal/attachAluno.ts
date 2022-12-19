import { TAluno, TPersonal } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";

export default class AttachAluno
{
    constructor(
        public alunoRepository:Repository<Aluno, TAluno>,
        public personalRepository:Repository<Personal, TPersonal>
    ){}
}