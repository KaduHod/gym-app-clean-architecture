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
        
        const permissions = body?.alunos?.permissions ?? body?.aluno?.permissions

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
    setWhere(body:GraphQlObject): Prisma.usersWhereInput
    {
        return {
            id: Number(body?.aluno?.id ?? body?.alunos?.id)
        } as Prisma.usersWhereInput
    },
    toGraphQlAlunoObject(aluno:any[] | any)
    {
        if(Array.isArray(aluno)){
            return aluno.map( ({users_permissions,...aluno}:any) => {
                if(users_permissions){
                    return {...aluno, permissions:users_permissions.map(({permission}:any) => permission)}
                } 
                return aluno
            })
        }
        const {users_permissions, ...alunoAttrs} = aluno as any;

        if(users_permissions) {
            return {
                ...alunoAttrs,
                permissions: users_permissions.map(({permission}:any) => permission)
            }     
        }
        
        return alunoAttrs
    },
}
