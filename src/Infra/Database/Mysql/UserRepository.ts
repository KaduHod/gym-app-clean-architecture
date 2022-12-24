import { PK, Repository } from "../../../App/Repositories/Repository";
import User from "../../../Domain/Entities/User";
import { TUser } from "../../../Domain/Entities/Entities";
import { getConn } from './conn'
import { Knex } from "knex";
import MysqlRepository from "./MysqlRepository";
export default 
    class MysqlUserRepository 
    extends MysqlRepository<User, TUser>
{
    constructor()
    {
        super('users')
    }
}