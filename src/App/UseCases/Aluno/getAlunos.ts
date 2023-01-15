import { TUser } from "../../../Domain/Entities/Entities";
import User from "../../../Domain/Entities/User";
import { AlunoRepository, Repository } from "../../Repositories/Repository";
import { Prisma } from "@prisma/client";

type alunoQueryFields = {
    alunoFields?:string[],
    userFields?:string[]
} | any

export default class getAlunosUseCase<RepositoryQueryOptions>
{
    constructor(
        public alunoRepository: AlunoRepository,
        public options?: RepositoryQueryOptions
    ){}

    async execute()
    {
        return await this
                        .alunoRepository
                        .findAll(this.options)
    }
}