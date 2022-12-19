import User from '../../../../Domain/Entities/User'
import UserSeeder from './UserSeeder'
import PersonalSeeder from './PersonalSeeder'
import AlunoSeeder from './AlunoSeeder'

const seed = async () => {
    const userSeeder = UserSeeder()
    const personalSeeder = PersonalSeeder()
    const alunoSeeder = AlunoSeeder()
    
    await userSeeder.handler()
    await personalSeeder.handler()
    await alunoSeeder.handler()
}

seed()