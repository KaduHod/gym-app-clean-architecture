import { Aluno, Personal } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class AttachAluno
{
    constructor(
        public alunoRepository:Repository<Aluno>,
        public personalRepository:Repository<Personal>
    ){}
}