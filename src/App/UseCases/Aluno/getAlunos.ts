import { AlunoRepository } from "../../Repositories/Repository";
export default class GetAlunosUseCase
{
    constructor(
        public alunoRepository: AlunoRepository,
        public options?: any
    ){}

    async execute()
    {
        return await this
                        .alunoRepository
                        .findAll(this.options)
    }
}