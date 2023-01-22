import { AlunoRepository } from "../../Repositories/Repository";
import AlunoNotFound from "../Errors/AlunoNotFound";
export default class GetAlunoUseCase
{
    constructor(
        public alunoRepository: AlunoRepository,
        public options: any,
        public mapper?:Function
    ){}

    async execute()
    {
        const aluno = await this
                                .alunoRepository
                                .findBy(this.options, true); 
        if(!aluno) 
            throw new AlunoNotFound();


        if(this.mapper)
            return this.mapper(aluno);
        
        return aluno;
    }
}