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

import GetUsersUseCase from "../../App/UseCases/Users/getUsers"
import UserPrismaRepository from "../Database/Prisma/UserPrismaRepository"

const setParams = (query:any) => {
    return users
}

export default {
    Query:{
        async user(){
            const userRepository = new UserPrismaRepository()
            return await (new GetUsersUseCase(userRepository)).main()
        },
        async users(
            oi:any, 
            _args:any, 
            context:any
        ){
            // const teste = setParams(context.params.query)
            const keys = Object.keys(context.request)
            console.log(context.request.formData())
            const userRepository = new UserPrismaRepository()
            return await (new GetUsersUseCase(userRepository)).main()
        }
    },
    Mutation:{
        createUser(param:any){
            console.log(param)
            return users[0]
        }
    }
}