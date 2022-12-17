import { Personal } from "../../../Domain/Entities/Entities";
import { Repository } from "../../Repositories/Repository";

export default class RegisterPersonal
{
    constructor(
        public personalRepository:Repository<Personal>
    ){}
}