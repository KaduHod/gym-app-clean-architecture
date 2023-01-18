import Personal from "../../../Domain/Entities/Personal";
import { PersonalRepository } from "../../Repositories/Repository";

export default class GetPersonaisUseCase
{
    constructor(
        public personalRepository: PersonalRepository,
        public options: any,
    ){}

    async main()
    {
        return await this.personalRepository.findAll(this.options)
    }
}