export default class ExerciseNotFound extends Error
{
    constructor()
    {
        super('Exercise not found!')
    }
}