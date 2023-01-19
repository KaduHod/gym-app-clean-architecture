import { Prisma } from "@prisma/client";
import { writeFile } from "fs/promises";
import Aluno from "../../../../Domain/Entities/Aluno";
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
        const select = {} as Prisma.usersSelect
        alunoFields.forEach((field:string) => select[field as keyof Prisma.usersSelect] = true);

        const permissions = body.alunos.permissions ?? body.aluno.permissions

        if(permissions) {
            const selectPermission = {} as Prisma.permissionsSelect;
            Object
                .keys(permissions)
                .forEach((field:string) => selectPermission[field as keyof Prisma.permissionsSelect] = true);

            select.users_permissions = {
                select : {
                    permission : {
                        select : selectPermission
                    } as Prisma.permissionsArgs
                } as Prisma.users_permissionsSelect
            } as Prisma.users$users_permissionsArgs
        }

        return select
    },
    async toGraphQlAlunoObject(alunos:Aluno[])
    {
        return alunos.map( ({users_permissions,...aluno}:any) => {
            return {...aluno, permissions:users_permissions.map(({permission}:any) => permission)}
        })
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
