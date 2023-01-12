import knex, {Knex} from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

export class MysqlDB
{
    public conn:Knex
    public isConnected:boolean
    
    constructor(){
        this.isConnected = false
        this.conn = this.createConn()
        
    }

    public createConn(): Knex
    {
        this.conn = this.isConnected ? this.conn : knex({
            client: 'mysql2',
            connection:{
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password : process.env.MYSQL_PASSWORD,
                port: process.env.MYSQL_PORT ?? 4567,
                database : process.env.MYSQL_DATABASE
            }
        })
        this.isConnected = true
        return this.conn
    }

    getConn()
    {
        return this.conn
    }

    public disconnect(): void
    {
        if(!this.isConnected) return
        this.conn.destroy()
        this.isConnected = false
    }
}

const mysql = new MysqlDB();

export const getConn = () => {
    const connection = mysql
    if(connection.isConnected) return connection.getConn()
    return connection.createConn()
}