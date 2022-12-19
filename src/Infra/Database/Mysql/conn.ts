import knex, {Knex} from 'knex'
class MysqlDB
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
                host: 'localhost',
                user: 'root',
                password : 'password',
                port:3306,
                database : 'gymapp2'
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
export  const getConn = () => {
    const connection = mysql
    if(connection.isConnected) return connection.getConn()
    return connection.createConn()
}