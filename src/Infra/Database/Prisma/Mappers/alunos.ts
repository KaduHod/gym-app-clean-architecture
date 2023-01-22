import { Prisma } from "@prisma/client";
import { writeFile } from "fs/promises";
import Aluno from "../../../../Domain/Entities/Aluno";
import { isObject } from "../../../../Helpers/Objects";
import { GraphQlObject } from "../../../Web/resolvers";
import { PrismaAlunoQueryOptions } from "../querys";

export default {
    getAlunofromBody(body:GraphQlObject)
    {
        return body.aluno ?? body.alunos;
    },
    getFields(body:GraphQlObject): string[]
    {
        const aluno = body.alunos ?? body.aluno 
        const alunoFields = Object.keys(aluno)
        return alunoFields.filter((field:string) => !isObject(aluno[field]));
    },
    setSelect(body:GraphQlObject): Prisma.usersSelect
    {
        const aluno = this.getAlunofromBody(body);
        const select = {} as Prisma.usersSelect
        for (const field in aluno) 
        {
            if(field === 'permissions') {
                select.users_permissions = this.setUsersPermissionsSelect(body);
                continue;
            }
            if(field === 'personais') {
                select.personais = this.setPersonaisSelect(body);
                continue;
            }

            select[field as keyof Prisma.usersSelect] = true
        }
        
        return select
    },
    setPersonaisSelect(body:GraphQlObject): Prisma.users$personaisArgs
    {
        const {personais} = this.getAlunofromBody(body);
        const selectPersonais = {} as Prisma.usersSelect; 
        for(const field in personais)
        {
            selectPersonais[field as keyof Prisma.usersSelect] = true;
        }
        return {
            select: {
                personal: {
                    select: selectPersonais
                } as Prisma.usersArgs
            } as Prisma.personal_alunoSelect
        } as Prisma.users$personaisArgs
    },
    setUsersPermissionsSelect(body:GraphQlObject): Prisma.users$users_permissionsArgs
    {
        const {permissions} = this.getAlunofromBody(body);
        const selectPermission = {} as Prisma.permissionsSelect;
        for(const field in permissions)
        {
            selectPermission[field as keyof Prisma.permissionsSelect] = true;
        }
        return {
            select : {
                permission : {
                    select : selectPermission
                } as Prisma.permissionsArgs
            } as Prisma.users_permissionsSelect
        } as Prisma.users$users_permissionsArgs
    },
    setWhere(body:GraphQlObject): Prisma.usersWhereInput
    {
        const {id} = this.getAlunofromBody(body)
        const where = {} as Prisma.usersWhereInput;
        if(id) where.id = Number(id)
        
        return where
    },
    toGraphQlAlunoObject(aluno:any[] | any)
    {
        if(Array.isArray(aluno)){
            return aluno.map( ({users_permissions, personais, ...aluno}:any) => {
                let alunoAttrs = aluno
                if(personais)
                {
                    alunoAttrs = {
                        ...alunoAttrs,
                        personais: personais.map(({personal}:any) => personal)
                    }
                }
                if(users_permissions)
                {
                    alunoAttrs = {
                        ...alunoAttrs,
                        permissions: users_permissions.map(({permission}:any) => permission)
                    }
                } 
                return alunoAttrs
            })
        }

        let {users_permissions, personais, ...alunoAttrs} = aluno as any;

        if(personais){
            alunoAttrs = {
                ...alunoAttrs, 
                personais: personais.map(({personal}:any) => personal)
            }
        }
        if(users_permissions) {
            alunoAttrs = {
                ...alunoAttrs, 
                permissions: users_permissions.map(({permission}:any) => permission)
            }
        }

        return alunoAttrs
    },
}
