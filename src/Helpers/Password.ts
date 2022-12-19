import crypto from 'crypto'

var salt = crypto.randomBytes(16).toString('hex');

export default class Password 
{
    public static encrypt(password:string): string
    {
        return crypto
                    .pbkdf2Sync(
                        password, 
                        salt, 
                        1000, 
                        64, 
                        `sha512`
                    ).toString(`hex`);
    }

    public static validate(password: string, hashedPassword: string)
    {
        const hash = crypto
                        .pbkdf2Sync(
                            password, 
                            salt, 
                            1000, 
                            64, 
                            `sha512`
                        ).toString(`hex`);
            return hash === hashedPassword;
    }
}