const users = [
    {
        id:1,
        name:'Carlos',
        nickname:'KaduHod',
        email: 'carlos.ribas@gmail.com',
        password:'123456',
        cellphone:'2134234932048'
    },
    {
        id:2,
        name:'Carlos2',
        nickname:'KaduHod2',
        email: 'carlos.ribas2@gmail.com',
        password:'1234562',
        cellphone:'21342349320482'
    }
]

import getAlunosUseCase from "../../App/UseCases/Aluno/getAlunos"
import GetUsersUseCase from "../../App/UseCases/Users/getUsers"
import PrismaAlunoRepository from "../Database/Prisma/PrismaAlunoRepository"
import UserPrismaRepository from "../Database/Prisma/UserPrismaRepository"
import graphQlMapper from "../Resolvers/mappers/graphQl"
import PrismaMapper from "../Database/Prisma/Mappers/prisma"

export default {
    Query:{
        async user(){
            return await (
                new GetUsersUseCase(
                    new UserPrismaRepository()
                )
            ).main()
        },

        async users(
            _:any, 
            _args:any, 
            context:any
        ){
            const graphQuery = graphQlMapper.toJson(context.params.query)
            const fields = PrismaMapper.user.getFields(graphQuery)
            
            return await (
                new GetUsersUseCase(
                    new UserPrismaRepository(), 
                    fields
                )
            ).main()
        },

        async alunos(
            _:any, 
            _args:any, 
            context:any)
        {
            const graphQuery = graphQlMapper.toJson(context.params.query)
            const userFields = PrismaMapper.aluno.getUserFields(graphQuery)
            const alunoFields = PrismaMapper.aluno.getAlunoFields(graphQuery)

            console.log({alunoFields, userFields})
            return await (
                new getAlunosUseCase(
                    new PrismaAlunoRepository(),
                    {

                    }
                )
            ).execute();
        }
    }
}
