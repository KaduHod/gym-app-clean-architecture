import express from 'express'
import ExerciseController from '../Controllers/Exercises'

const router = express.Router()


router.get('/exercises/:id', ExerciseController.index)

export default router;