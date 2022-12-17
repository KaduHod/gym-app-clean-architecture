import { Aluno, Personal } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class HirePersonal
{
    constructor(
        public personalRepository:Repository<Personal>,
        public alunoRepository:Repository<Aluno>
    ){}
}