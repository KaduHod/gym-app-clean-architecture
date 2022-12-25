import { Repository } from "../../Repositories/Repository";
import { TAluno, TUser } from "../../../Domain/Entities/Entities";
import Aluno from "../../../Domain/Entities/Aluno";
import { AlunoFactory } from "../../../Domain/Factory/AlunoFactory";
import User from "../../../Domain/Entities/User";

export default class RegisterAluno
{
    constructor(
        public alunoRepository: Repository<Aluno, TAluno>,
        public userRepository: Repository<User, TUser>,
        public aluno: TAluno
    ){}

    public async main(): Promise<any>
    {
        this.createAluno()
        return await this.alunoRepository.save(this.aluno)
    }

    public createAluno()
    {
        this.aluno = AlunoFactory.create(this.aluno)
    }

    public async userExists(): Promise<boolean>
    {
        return await this
                        .userRepository
                        .exists(this.aluno.user_id)
    }

}