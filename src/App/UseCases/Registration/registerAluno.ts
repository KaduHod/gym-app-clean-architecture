import { Repository } from "../../Repositories/Repository";
import { Aluno } from "../../../Domain/Entities/Entities";

export default class RegisterAluno
{
    constructor(
        public userRepository:Repository<Aluno>
    ){}
}