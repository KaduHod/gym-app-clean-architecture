export default class UserNotFoundError extends Error
{
    constructor()
    {
        super('User not found!')
    }
}