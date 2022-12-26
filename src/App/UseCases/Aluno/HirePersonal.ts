import { TAluno, TPersonal } from "../../../Domain/Entities/Entities";
import { PK, Repository } from "../../Repositories/Repository";
import Personal from "../../../Domain/Entities/Personal";
import AlunoNotFound from "../Errors/AlunoNotFound";
import PersonalNotFoundError from "../Errors/PersonalNotFound";
import AlunoAlreadyHasPersonal from "../Errors/AlunoAlreadyHasPersonal";
import { AlunoRepository } from "../../Repositories/Repository";
import Aluno from "../../../Domain/Entities/Aluno";

export default class HirePersonal
{
    private aluno:Aluno | null;
    constructor(
        public personalRepository:Repository<Personal, TPersonal>,
        public alunoRepository:AlunoRepository,
        public alunoid:PK,
        public personalId:PK
    ){
        this.aluno = null
    }

    public async main(): Promise<any>
    {
        await this.getAluno()
        
        const alunoExists = await this.alunoExists()
        if(!alunoExists) throw new AlunoNotFound()

        const personalExists = await this.personalExists()
        if(!personalExists) throw new PersonalNotFoundError()

        const alunoAlreadyHasPersonal = await this.alunoAlreadyHasPersonal()
        if(alunoAlreadyHasPersonal) throw new AlunoAlreadyHasPersonal()
        
        const hireResult = await this
                                    .alunoRepository
                                    .hirePersonal(this.alunoid, this.personalId)
        return hireResult
    }

    public async alunoExists(): Promise<boolean>
    {
        if(!this.aluno) await this.getAluno()
        return !!this.aluno
        
    }

    public async personalExists(): Promise<boolean>
    {
        return !!(await this.personalRepository.exists(this.personalId))
    }

    public async alunoAlreadyHasPersonal() :Promise<boolean>
    {
        if(!this.aluno) await this.getAluno()
        return !!this.aluno?.personal_id
    }

    public async getAluno(): Promise<void>
    {
        this.aluno = await this.alunoRepository.findByPK(this.alunoid)
    }


}