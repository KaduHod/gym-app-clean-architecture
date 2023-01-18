import { AlunoRepository } from "../../Repositories/Repository";
import AlunoNotFound from "../Errors/AlunoNotFound";
export default class GetAlunoUseCase
{
    constructor(
        public alunoRepository: AlunoRepository,
        public options?: any
    ){}

    async execute()
    {
        const aluno = await this
                                .alunoRepository
                                .findBy(this.options, true); 
        if(!aluno) 
            throw new AlunoNotFound();
    
        
        return aluno;
    }
}