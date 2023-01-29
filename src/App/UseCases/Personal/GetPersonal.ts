import { PersonalRepository } from "../../Repositories/Repository";

export default class GetPersonalUseCase 
{
    constructor(
        public personalRepository: PersonalRepository,
        public options: any,
        public mapper?: Function
    ){}

    async main():Promise<any>
    {
        const personal = await this.personalRepository.findBy(this.options, true)
        if(this.mapper && personal) return this.mapper(personal)
        return personal
    }
}