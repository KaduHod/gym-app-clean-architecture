import User from "../Entities/User"
import { TUser } from "../Entities/Entities"
import { faker } from '@faker-js/faker'


export const UserFactory = {
    create(attrs: TUser): User 
    {
        return new User(attrs)
    },
    createFromPartialAttributes(attrs: Partial<TUser>): User
    {
        return new User({
            name: attrs.name ?? faker.name.fullName(),
            nickname: attrs.nickname ?? faker.internet.userName(),
            email: attrs.email ?? faker.internet.email(),
            password: attrs.password ?? faker.internet.password(8)
        })
    },
    createRandom(): User 
    {
        return new User({
            name: faker.name.fullName(),
            nickname: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(8)
        })
    }
}