import GetAlunosUseCase from "../../App/UseCases/Aluno/getAlunos"
import GetUsersUseCase from "../../App/UseCases/Users/getUsers"
import GetExercisesUseCase from "../../App/UseCases/Exercices/GetExercises"
import GetExerciseUseCase from "../../App/UseCases/Exercices/GetExercise"
import PrismaAlunoRepository from "../Database/Prisma/PrismaAlunoRepository"
import PrismaUserRepository from "../Database/Prisma/PrismaUserRepository"
import PrismaExercicioRepository from "../Database/Prisma/PrismaExercicioRepository"
import graphQlMapper from "../Resolvers/mappers/graphQl"
import PrismaMapper from "../Database/Prisma/Mappers/prisma"
import { writeFile } from "fs/promises"
import GetUserUseCase from "../../App/UseCases/Users/GetUser"

export type GraphQlObject = {
    [key:string]:any
}

const YogaRequest = (fn:Function) => {
    return (...args:any) => {
        const body = graphQlMapper.toJson(args[2].params.query);
        console.log(body)
        return fn(body);
    }
}

let userResolver = async (body:GraphQlObject) => {
    const userFields = PrismaMapper.user.getFields(body)
    const select = PrismaMapper.user.setSelect({userFields})
    const where = PrismaMapper.user.setWhere(body);

    return await (
        new GetUserUseCase(
            new PrismaUserRepository(),
            {select, where}
        )
    ).main()
}

let usersResolver  = async (body:GraphQlObject) => {
    const userFields = PrismaMapper.user.getFields(body)
    const select = PrismaMapper.user.setSelect({userFields})
    
    return await (
        new GetUsersUseCase(
            new PrismaUserRepository(), 
            {select}
        )
    ).main()
}

let alunosResolver = async (body:GraphQlObject) => {
    const userFields = PrismaMapper.aluno.getUserFields(body)
    const alunoFields = PrismaMapper.aluno.getAlunoFields(body)
    const alunosOptionsQuery = PrismaMapper.aluno.queryOption({userFields, alunoFields})

    return await (
        new GetAlunosUseCase(
            new PrismaAlunoRepository(),
            alunosOptionsQuery
        )
    ).execute();
}

let exercisesResolver = async (body:GraphQlObject) => {
    const exercicioFields = PrismaMapper.exercicios.getFields(body)
    const muscleFields = PrismaMapper.exercicios.getMuscleFields(body)
    const queryOptions = PrismaMapper.exercicios.queryOption({exercicioFields, muscleFields})  
    
    return await (
        new GetExercisesUseCase(
            new PrismaExercicioRepository(),
            queryOptions,
            PrismaMapper.exercicios.toArrExercicios
        )
    ).main()
}

let exerciseResolver = async(body:GraphQlObject) => {
    const exercicioFields = PrismaMapper.exercicio.getFields(body)
    const muscleFields = PrismaMapper.exercicio.getMuscleFields(body)
    const where = PrismaMapper.exercicio.setWhere(body)
    const select = PrismaMapper.exercicio.setSelect({exercicioFields, muscleFields})
    
    return await (
        new GetExerciseUseCase(
            new PrismaExercicioRepository,
            {select, where},
            PrismaMapper.exercicio.toGraphQlExercise
        ).main()
    )
}

usersResolver = YogaRequest(usersResolver);
userResolver = YogaRequest(userResolver);
alunosResolver = YogaRequest(alunosResolver);
exercisesResolver = YogaRequest(exercisesResolver);
exerciseResolver = YogaRequest(exerciseResolver);

export default {
    Query:{
        user: userResolver,
        users: usersResolver,
        alunos: alunosResolver,
        exercises: exercisesResolver,
        exercise: exerciseResolver
    }
}
