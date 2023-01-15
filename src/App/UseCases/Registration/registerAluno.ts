import { AlunoRepository, Repository } from "../../Repositories/Repository";
import { TAluno, TUser } from "../../../Domain/Entities/Entities";
import Aluno from "../../../Domain/Entities/Aluno";
import { AlunoFactory } from "../../../Domain/Factory/AlunoFactory";
import User from "../../../Domain/Entities/User";

export default class RegisterAlunoUseCase<RepositoryQueryOptions>
{
    constructor(
        public alunoRepository: AlunoRepository,
        public options: any
    ){}

    public async main(): Promise<any>
    {
        return await this.alunoRepository.save(this.options)
    }

}