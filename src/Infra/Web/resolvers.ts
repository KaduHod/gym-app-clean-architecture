import GetAlunosUseCase from "../../App/UseCases/Aluno/getAlunos"
import GetUsersUseCase from "../../App/UseCases/Users/getUsers"
import GetExercisesUseCase from "../../App/UseCases/Exercices/GetExercises"
import PrismaAlunoRepository from "../Database/Prisma/PrismaAlunoRepository"
import PrismaUserRepository from "../Database/Prisma/PrismaUserRepository"
import PrismaExercicioRepository from "../Database/Prisma/PrismaExercicioRepository"
import graphQlMapper from "../Resolvers/mappers/graphQl"
import PrismaMapper from "../Database/Prisma/Mappers/prisma"
import { writeFile } from "fs/promises"

export type GraphQlObject = {
    [key:string]:any
}

const GrapQlRequest = (fn:Function) => {
    return (...args:any) => {
        const body = graphQlMapper.toJson(args[2].params.query);
        console.log(JSON.stringify(body))
        return fn(body);
    }
}

let userResolver = async (body:GraphQlObject) => {
    return await (
        new GetUsersUseCase(
            new PrismaUserRepository()
        )
    ).main()
}

let usersResolver  = async (body:GraphQlObject) => {
    const userFields = PrismaMapper.user.getFields(body)
    const usersQueryOption = PrismaMapper.user.queryOption({userFields})
    
    return await (
        new GetUsersUseCase(
            new PrismaUserRepository(), 
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
        new GetAlunosUseCase(
            new PrismaAlunoRepository(),
            alunosOptionsQuery
        )
    ).execute();
}

let exercisesResolver = async (body:GraphQlObject) => {
    const exercicioFields = PrismaMapper.exercicio.getFields(body)
    const muscleFields = PrismaMapper.exercicio.getMuscleFields(body)
    const queryOptions = PrismaMapper.exercicio.queryOption({
        exercicioFields, muscleFields
    })  
    
    return await (
        new GetExercisesUseCase(
            new PrismaExercicioRepository(),
            queryOptions,
            PrismaMapper.exercicio.toArrExercicios
        )
    ).main()
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
