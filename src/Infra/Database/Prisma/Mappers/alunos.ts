import { Prisma } from "@prisma/client";
import { isObject } from "../../../../Helpers/Objects";
import { GraphQlObject } from "../../../Web/resolvers";
import { PrismaAlunoQueryOptions } from "../querys";

export default {
    getFields(body:GraphQlObject): string[]
    {
        const aluno = body.alunos ?? body.aluno 
        const alunoFields = Object.keys(aluno)
        return alunoFields.filter((field:string) => !isObject(aluno[field]));
    },
    setSelect(body:GraphQlObject): Prisma.usersSelect
    {
        const alunoFields = this.getFields(body)
        return {}
    }
    /*
    setSelect({
        userFields, 
        alunoFields
    }:PrismaAlunoQueryOptions): Prisma.usersSelect
    {
        let select: Prisma.usersSelect = {}
        
        if(alunoFields)
        {
            select = alunoFields.reduce((acc:Prisma.usersSelect, curr:string) => {
                acc[curr as keyof Prisma.usersSelect] = true
                return acc
            },{})
            
        }

        if(userFields && userFields.length)
        {
            let usersArgs: Prisma.usersArgs = {}
            usersArgs.select = userFields.reduce((acc:Prisma.usersSelect, curr:string) => {
                acc[curr as keyof Prisma.usersSelect] = true
                return acc
            },{})
            select.user = usersArgs
        }

        return select
    }*/
}
