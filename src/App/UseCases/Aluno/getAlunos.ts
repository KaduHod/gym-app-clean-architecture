import { TUser } from "../../../Domain/Entities/Entities";
import User from "../../../Domain/Entities/User";
import { AlunoRepository, Repository } from "../../Repositories/Repository";

type alunoQueryFields = {
    alunoFields?:string[],
    userFields?:string[]
}

export default class getAlunosUseCase
{
    constructor(
        public alunoRepository: AlunoRepository,
        public fields?:alunoQueryFields
    ){}

    async execute()
    {
        let result:unknown;
        if(this.fields){
            if(
                this.fields.alunoFields &&
                this.fields.userFields
            )
            {
                result = await this.alunoRepository.findAll()
            }
            if(this.fields.alunoFields)
            {
                result = await this.alunoRepository.findAll()
            }
            if(this.fields.userFields)
            {
                result = await this.alunoRepository.findAll()
            }
        }
        result = await this.alunoRepository.findAll()
        
        return result
    }
}