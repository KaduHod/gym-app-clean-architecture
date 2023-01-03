import { PersonalRepository } from "../../Repositories/Repository";

export default class GetPersonalUseCase
{
    constructor(
        public personalRepository: PersonalRepository
    ){}
}