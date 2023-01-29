import { AlunoRepository } from "../../Repositories/Repository";
export default class GetAlunosUseCase
{
    constructor(
        public alunoRepository: AlunoRepository,
        public options?: any,
        public mapper?:Function
    ){}

    async execute()
    {
        const query = this
                        .alunoRepository
                        .findAll(this.options);

        if(this.mapper) 
            return this.mapper(await query);

        return await query;
        
    }
}