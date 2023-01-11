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
import { graphQlToJson } from "../Resolvers/graphQlToJson"

const setUserParams = (params:string):string[] => {
    
    return params
            .split('users')[1]
            .split('{')[1]
            .split('}')[0]
            .split('\n')
            .map(string => string.trim())
            .filter(string => !!string)
        
}
const setAlunoParams = (params:string):string[] => {
    
    return params
            .split('{')[2]
            .split('}')[0]
            .split('\n')
            .map(string => string.trim())
            .filter(string => !!string)
}

export default {
    Query:{
        async user(){
            const userRepository = new UserPrismaRepository()
            return await (
                new GetUsersUseCase(userRepository)
            ).main()
        },

        async users(
            _:any, 
            _args:any, 
            context:any
        ){
            const userRepository = new UserPrismaRepository()
            return await (
                new GetUsersUseCase(
                    userRepository, 
                    setUserParams(context.params.query)
                )
            ).main()
        },

        async alunos(
            _:any, 
            _args:any, 
            context:any)
        {
            // const formData = context.request.formData()
            // console.log(formData)
            // console.log({context})
            console.log(graphQlToJson(context.params.query))
            return await (
                new getAlunosUseCase(
                    new PrismaAlunoRepository(),
                    {

                    }
                )
            ).execute();
        }
    },
    Mutation:{
        createUser(param:any){
            console.log(param)
            return users[0]
        }
    }
}
