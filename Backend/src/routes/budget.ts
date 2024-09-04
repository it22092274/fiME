import express from "express";
import budgetController from '../controllers/budget'

const router = express.Router()

router.post('/', budgetController.add)
router.get('/', budgetController.readAll)
router.put('/', budgetController.update)
router.delete('/', budgetController.deleting)

export default router

