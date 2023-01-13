import { TAluno, TPersonal } from "../../../Domain/Entities/Entities";
import { PersonalRepository, PK, Repository } from "../../Repositories/Repository";
import Personal from "../../../Domain/Entities/Personal";
import AlunoNotFound from "../Errors/AlunoNotFound";
import PersonalNotFoundError from "../Errors/PersonalNotFound";
import AlunoAlreadyHasPersonal from "../Errors/AlunoAlreadyHasPersonal";
import { AlunoRepository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";
import { AlunoFactory } from "../../../Domain/Factory/AlunoFactory";

export default class HirePersonalUseCase
{
    constructor(
        public personalRepository: PersonalRepository,
        public alunoRepository: AlunoRepository,
        public alunoid: PK,
        public personalId: PK
    ){}

    public async main(): Promise<any>
    {        
        const aluno = await this.getAluno()
        if(!aluno) throw new AlunoNotFound()

        const personalExists = await this.personalExists()
        if(!personalExists) throw new PersonalNotFoundError()

        const alunoAlreadyHasPersonal = await this.alunoAlreadyHasPersonal(aluno)
        if(alunoAlreadyHasPersonal) throw new AlunoAlreadyHasPersonal()
        
        const hireResult = await this
                                    .alunoRepository
                                    .hirePersonal(this.personalId,this.alunoid)
        return hireResult
    }

    public async personalExists(): Promise<boolean>
    {
        return !!(await this
                            .personalRepository
                            .exists(this.personalId)
                )
    }

    public async alunoAlreadyHasPersonal(aluno:Aluno) :Promise<boolean>
    {
        return !!aluno?.personal_id
    }

    public async getAluno(): Promise<Aluno | null>
    {
        return AlunoFactory.create(
            await this
                    .alunoRepository
                    .findByPK(this.alunoid)
        )
    }


}