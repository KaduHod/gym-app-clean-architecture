import Personal from "../../../Domain/Entities/Personal";
import { PersonalRepository } from "../../Repositories/Repository";

export default class GetPersonaisUseCase
{
    constructor(
        public personalRepository: PersonalRepository,
        public options: any,
        public mapper?: Function
    ){}

    async main()
    {
        if(this.mapper) return this.mapper(await this.personalRepository.findAll(this.options))
        return await this.personalRepository.findAll(this.options)
    }
}