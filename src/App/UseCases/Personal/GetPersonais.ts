import Personal from "../../../Domain/Entities/Personal";
import { optionsFindByPersonalWithUsers, PersonalRepository } from "../../Repositories/Repository";

export default class GetPersonaisUseCase<RepositoryQueryOptions>
{
    constructor(
        public personalRepository: PersonalRepository,
        public options: optionsFindByPersonalWithUsers | any,
    ){}

    async main()
    {
        return await this.personalRepository.findByWithUser(this.options)
    }
}