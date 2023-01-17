import { AlunoRepository } from "../../Repositories/Repository";
export default class GetAlunoUseCase
{
    constructor(
        public alunoRepository: AlunoRepository,
        public options?: any
    ){}

    async execute()
    {
        return await this
                        .alunoRepository
                        .findBy(this.options, true)
    }
}