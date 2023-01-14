import getAlunosUseCase from "../../App/UseCases/Aluno/getAlunos"
import GetUsersUseCase from "../../App/UseCases/Users/getUsers"
import PrismaAlunoRepository from "../Database/Prisma/PrismaAlunoRepository"
import UserPrismaRepository from "../Database/Prisma/PrismaUserRepository"
import graphQlMapper from "../Resolvers/mappers/graphQl"
import PrismaMapper from "../Database/Prisma/Mappers/prisma"

export type GraphQlObject = any

const GrapQlRequest = (fn:Function) => {
    return (...args:any) => {
        const body = graphQlMapper.toJson(args[2].params.query);
        console.log({body})
        return fn(body);
    }
}

let userResolver = async (body:GraphQlObject) => {
    return await (
        new GetUsersUseCase(
            new UserPrismaRepository()
        )
    ).main()
}

let usersResolver  = async (body:GraphQlObject) => {
    const userFields = PrismaMapper.user.getFields(body)
    const usersQueryOption = PrismaMapper.user.queryOption({userFields})
    
    return await (
        new GetUsersUseCase(
            new UserPrismaRepository(), 
            usersQueryOption
        )
    ).main()
}

let alunosResolver = async (body:GraphQlObject) => {
    const userFields = PrismaMapper.aluno.getUserFields(body)
    const alunoFields = PrismaMapper.aluno.getAlunoFields(body)
    const alunosOptionsQuery = PrismaMapper.aluno.queryOption({
        userFields, alunoFields
    })
    return await (
        new getAlunosUseCase(
            new PrismaAlunoRepository(),
            alunosOptionsQuery
        )
    ).execute();
}

let exercisesResolver = async (body:GraphQlObject) => {
    return [{
        id:1,
        name:'Supino',
        force: 'pull',
        link: 'http://google.com',
        execution: ' nice and easy'
    }]
}

usersResolver = GrapQlRequest(usersResolver);
alunosResolver = GrapQlRequest(alunosResolver);
exercisesResolver = GrapQlRequest(exercisesResolver);
userResolver = GrapQlRequest(userResolver);

export default {
    Query:{
        user: userResolver,
        users: usersResolver,
        alunos: alunosResolver,
        exercises: exercisesResolver
    }
}
