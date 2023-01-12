import { TUser } from "../../../Domain/Entities/Entities";
import User from "../../../Domain/Entities/User";
import { AlunoRepository, Repository } from "../../Repositories/Repository";

type alunoQueryFields = {
    alunoFields?:string[],
    userFields?:string[]
} | any

export default class getAlunosUseCase
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