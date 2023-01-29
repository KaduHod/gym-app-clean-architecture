import { faker } from "@faker-js/faker";
import Personal from "../Entities/Personal";
import { TPersonal } from "../Entities/Entities";
import { PK } from "../../App/Repositories/Repository";

export const PersonalFactory = {
    create(attrs: TPersonal): Personal
    {
        return new Personal({
            user_id: attrs.user_id
        })
    },
    createRandom(userId:PK): Personal
    {
        return new Personal({
            user_id: userId
        })
    },
    createFromPartialAttributes(userId:PK): Personal
    {
        return new Personal({
            user_id: userId
        })
    }
}