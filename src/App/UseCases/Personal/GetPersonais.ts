import Personal from "../../../Domain/Entities/Personal";
import { optionsFindByPersonalWithUsers, PersonalRepository } from "../../Repositories/Repository";

export default class GetPersonaisUseCase<RepositoryQueryOptions>
{
    constructor(
        public personalRepository: PersonalRepository,
        public options: optionsFindByPersonalWithUsers,
    ){}

    async main()
    {
        return await this.personalRepository.findByWithUser({
            attrs: this.options.attrs,
            fields: this.options.fields,
            userFields: this.options.userFields,
            first: this.options.first
        })
    }
}