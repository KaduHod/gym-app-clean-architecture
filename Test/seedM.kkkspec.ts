import { readFile, writeFile} from "fs/promises";
import { json } from "node:stream/consumers";
import { describe, it  } from "vitest";
import MysqlExerciseRepository from "../src/Infra/Database/Mysql/ExerciseRepository";
import MysqlMuscleRepository from '../src/Infra/Database/Mysql/MuscleRepository'

async function getFileData(): Promise<any>
{
    return JSON.parse(await readFile('./exercises-info-final.json', 'utf8'))
}


describe('hello', () => {
    const exercicioRepo = new MysqlExerciseRepository;
    const muscleRepo = new MysqlMuscleRepository;
    const findExercises = async () => {
        const exercises = await getFileData()
        let cont = 0
        let data = []
        for await (const exercise of exercises){
            const exercise1:any = await exercicioRepo.findBy(
                {name: exercise.exercise.exerciseName},
                true
            )
            
            data.push(await setMuscleData({
                exercise : exercise1,
                agonist: exercise.exercise.Agonist,
                synergist: exercise.exercise.Synergists,
                antagonist: exercise.exercise.Antagonists,
                "antagonists stabilizers": exercise.exercise['Antagonist Stabilizers'],
                "dinamic stabilizers": exercise.exercise['Dynamic Stabilizers']
            }, cont))
            
            cont++
        }

        await writeFile('data.json', JSON.stringify(data))
    }

    

    const getLength = async () => {
        return JSON.parse(await readFile('./exercises-info-final.json', 'utf8')).length
    }


    const setMuscleData = async (data, cont) => {

        const getAgonists = async (cont) => {
            let retorno = []
            for await (const agonist of data.agonist)
            {
                if(!agonist) return null
                retorno.push(await muscleRepo.findBy({name: agonist.name}, true))
            }

            return retorno
        }

        const getSynergist = async () => {
            let retorno = []
            
            if(Array.isArray(data.synergist) && data.synergist[0] === null){
                return null
            }
            for await (const synergist of data.synergist)
            {
                retorno.push(await muscleRepo.findBy({name: synergist.name}, true))
            }

            return retorno
        }

        const getAntagonist = async () => {
            let retorno = []
            if(Array.isArray(data.antagonist) && data.antagonist[0] === null){
                return null
            }
            for await (const antagonist of data.antagonist)
            {
                retorno.push(await muscleRepo.findBy({name: antagonist.name}, true))
            }

            return retorno
        }

        const getAntagonists_stabilizers = async () => {
            let retorno = []
            if(Array.isArray(data['antagonists stabilizers']) && data['antagonists stabilizers'][0] === null){
                return null
            }
            for await (const Antagonists_stabilizers of data['antagonists stabilizers'])
            {
                retorno.push(await muscleRepo.findBy({name: Antagonists_stabilizers.name}, true))
            }

            return retorno
        }

        const getDinamic_stabilizers = async () => {
            let retorno = []
            for await (const dinamic_stabilizers of data['dinamic stabilizers'])
            {
                retorno.push(await muscleRepo.findBy({name: dinamic_stabilizers.name}, true))
            }

            return retorno
        }


        
        return {
            exercise : data.exercise,
            agonists : data.agonist ? await getAgonists(cont) : null,
            synergist : data.synergist ? await getSynergist() : null,
            antagonist : data.antagonist ? await getAntagonist() : null,
            "antagonists stabilizers" : data['antagonists stabilizers'] ? await getAntagonists_stabilizers() : null,
            "dinamic stabilizers" : data['dinamic stabilizers'] ? await getDinamic_stabilizers() : null
        }
    }

    
    const getData = async () => {
        return JSON.parse(await readFile('./data.json','utf8'))
    }

    /*it('hello', async () => {
        const exercises = await getData()
        let data = []
        for await (const exercise of exercises)
        {
            // console.log({exercise})
            let one = {
                exercise_id : exercise.exercise.id,
                agonists : exercise.agonists && exercise.agonists[0] ? exercise.agonists.map((data:any) => {
                    if(data) return data.id
                }) : null,
                synergist : exercise.synergist && exercise.synergist[0] ? exercise.synergist.map((data:any) => {
                    if(data) return data.id
                }) : null,
                antagonist : exercise.antagonist && exercise.antagonist[0] ? exercise.antagonist.map((data:any) => {
                    if(data) return data.id
                }) : null,
                'antagonists stabilizers' : exercise['antagonists stabilizers'] && exercise['antagonists stabilizers'][0] ? exercise['antagonists stabilizers'].map((data:any) => {
                    if(data) return data.id
                }) : null,
                'dinamic stabilizers' : exercise['dinamic stabilizers'] && exercise['dinamic stabilizers'][0] ? exercise['dinamic stabilizers'].map((data:any) => {
                    if(data) return data.id
                }) : null,
            }
            // console.log({one})
            data.push(one)
        }

        await writeFile('data2.json', JSON.stringify(data))
        // console.log(await getLength())
        // await findExercises()
        // console.log(await getLength())
    })*/
    /*it('Should fix data2', async () => {
        let file = JSON.parse(await readFile('./data2.json', 'utf8'))
        let data:any = []
        file.forEach((exercise:any) => {
            let exerciseWithKeysFiltered = {}
            for (const key in exercise)
            {
                if(Array.isArray(exercise[key]))
                {
                    exercise[key] = exercise[key].filter((item:any) => !!item)
                }
            }

            data.push(exercise)
        })

        await writeFile('./data-filtered.json', JSON.stringify(data))
    })*/
    /*it('Should save muscles from exercise', async () => {
        let exercises = JSON.parse(await readFile('./data-filtered.json', 'utf8'))
        // let date = (new Date()).toString().split(' G')[0]
        let date = (new Date()).toISOString()

        let sql = "INSERT INTO TO exercise_muscle ()"
       
        // console.log(exercises[2])

        let index = 0

        for await (const exercise of exercises) 
        {
            let keys = Object.keys(exercise)
            const {exercise_id} = exercise
            // if(index === 1){         
                for await (const key of keys) 
                {
                    if(exercise[key] && key !== 'exercise_id'){
                        
                        for await (const muscle_id of exercise[key]){
                            let insertObjetc:any = {exercise_id,role:key,muscle_id}
                            // console.log({insertObjetc})
                            await muscleRepo.conn('exercise_muscle').insert(insertObjetc)
                        }
                        
                    }
                    
                }
            
            
            // }
            index ++
        }
        
    })*/
})