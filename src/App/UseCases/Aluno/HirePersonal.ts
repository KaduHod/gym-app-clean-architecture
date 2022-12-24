import { TAluno, TPersonal } from "../../../Domain/Entities/Entities";
import { PK, Repository } from "../../Repositories/Repository";
import Personal from "../../../Domain/Entities/Personal";
import AlunoNotFound from "../Errors/AlunoNotFound";
import PersonalNotFoundError from "../Errors/PersonalNotFound";
import { AlunoRepository } from "../../Repositories/Repository";

export default class HirePersonal
{
    constructor(
        public personalRepository:Repository<Personal, TPersonal>,
        public alunoRepository:AlunoRepository,
        public alunoid:PK,
        public personalId:PK
    ){}

    public async main(): Promise<any>
    {
        const alunoExists = await this.alunoExists()
        if(!alunoExists) throw new AlunoNotFound()
        
        const personalExists = await this.personalExists()
        if(!personalExists) throw new PersonalNotFoundError()
        
        const hireResult = await this
                                    .alunoRepository
                                    .hirePersonal(this.personalId, this.alunoid)
        return hireResult
    }

    public async alunoExists(): Promise<boolean>
    {
        const aluno = await this.alunoRepository.exists(this.alunoid)
        console.log(aluno)
        return aluno
    }

    public async personalExists(): Promise<boolean>
    {
        const personal = await this.personalRepository.exists(this.personalId)
        console.log(personal)
        return personal
    }
}