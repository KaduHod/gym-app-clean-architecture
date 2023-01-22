import { writeFile } from "fs/promises";
import Personal from "../../../Domain/Entities/Personal";
import { AlunoRepository, PersonalRepository } from "../../Repositories/Repository";

export default class GetPersonaisWithALunosUseCase 
{
    constructor(
        public personalRepository: PersonalRepository,
        public alunoRepository: AlunoRepository,
        public personalOptions: any,
        public alunoOptions:any,
        public mapper:Function
    ){}

    async main()
    {
        const personais = await this.getPersonais()
        const alunos = await this.getAlunos()  

        return this.mapper(personais, alunos)
    }

    async getPersonais(): Promise<any[]>
    {
        return await this.personalRepository.findAll(this.personalOptions);
    }

    async getAlunos(): Promise<any[]>
    {
        return await this.alunoRepository.findAll(this.alunoOptions)
    }
}