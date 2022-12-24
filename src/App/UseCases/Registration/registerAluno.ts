import { Repository } from "../../Repositories/Repository";
import { TAluno } from "../../../Domain/Entities/Entities";
import Aluno from "../../../Domain/Entities/Aluno";
import { AlunoFactory } from "../../../Domain/Factory/AlunoFactory";

export default class RegisterAluno
{
    constructor(
        public alunoRepository:Repository<Aluno, TAluno>,
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
}