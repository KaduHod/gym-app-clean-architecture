import { Repository } from "../../Repositories/Repository";
import { TAluno } from "../../../Domain/Entities/Entities";
import Aluno from "../../../Domain/Entities/Aluno";

export default class RegisterAluno
{
    constructor(
        public userRepository:Repository<Aluno, TAluno>
    ){}
}