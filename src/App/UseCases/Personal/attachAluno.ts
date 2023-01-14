import { TAluno, TPersonal } from "../../../Domain/Entities/Entities";
import { AlunoRepository, PK, PersonalRepository, Repository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";
import Personal from "../../../Domain/Entities/Personal";
import PersonalNotFoundError from "../Errors/PersonalNotFound";
import AlunoNotFound from "../Errors/AlunoNotFound";
import AlunoAlreadyHasPersonal from "../Errors/AlunoAlreadyHasPersonal";

export default class AttachAluno
{
    public aluno: Aluno | null
    constructor(
        public alunoRepository:AlunoRepository,
        public personalRepository:PersonalRepository,
        public personalId: PK,
        public alunoId: PK
    ){
        this.aluno = null
    }

    public async main(): Promise<any>
    {
        const personalExists = await this.personalExists()
        if(!personalExists) throw new PersonalNotFoundError()

        const alunoExists = await this.alunoExists()
        if(!alunoExists) throw new AlunoNotFound()

        const alunoAlreadyHasPersonal = await this.alunoAlreadyHasPersonal()
        if(alunoAlreadyHasPersonal) throw new AlunoAlreadyHasPersonal()

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

    public async alunoAlreadyHasPersonal() :Promise<boolean>
    {
        if(!this.aluno) await this.getAluno()
        
        return !!this.aluno?.personal_id
    }

    public async getAluno(): Promise<void>
    {
        this.aluno = await this.alunoRepository.findByPK(this.alunoId)
    }
    
}