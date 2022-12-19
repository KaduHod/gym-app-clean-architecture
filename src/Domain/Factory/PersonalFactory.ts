import { faker } from "@faker-js/faker";
import Personal from "../Entities/Personal";
import { TPersonal } from "../Entities/Entities";
import { PK } from "../../App/Repositories/Repository";

export const PersonalFactory = {
    create(attrs: TPersonal): Personal
    {
        return new Personal({
            userId: attrs.userId
        })
    },
    createRandom(userId:PK): Personal
    {
        return new Personal({
            userId: userId
        })
    },
    createFromPartialAttributes(userId:PK): Personal
    {
        return new Personal({
            userId: userId
        })
    }
}