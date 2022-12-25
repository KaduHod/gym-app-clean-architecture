import { TAluno, TPersonal } from "../../../Domain/Entities/Entities";
import { AlunoRepository, PK, Repository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";
import Personal from "../../../Domain/Entities/Personal";
import PersonalNotFoundError from "../Errors/PersonalNotFound";
import AlunoNotFound from "../Errors/AlunoNotFound";

export default class AttachAluno
{
    constructor(
        public alunoRepository:AlunoRepository,
        public personalRepository:Repository<Personal, TPersonal>,
        public personalId: PK,
        public alunoId: PK
    ){}

    public async main(): Promise<any>
    {
        const personalExists = await this.personalExists()
        if(!personalExists) throw new PersonalNotFoundError()

        const alunoExists = await this.alunoExists()
        if(!alunoExists) throw new AlunoNotFound()

        const attachResult = await this.attach()

        return attachResult
    }

    public async personalExists(): Promise<boolean>
    {
        return await this
                        .personalRepository
                        .exists(this.personalId)
    }

    public async alunoExists(): Promise<boolean>
    {
        return await this
                        .alunoRepository
                        .exists(this.alunoId)
    }

    public async attach(): Promise<any>
    {
        return await this
                        .alunoRepository
                        .hirePersonal(this.alunoId, this.personalId)
    }
}