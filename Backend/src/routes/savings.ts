import express from "express";
import savingsController from '../controllers/savings'

const router = express.Router()

router.post('/', savingsController.add)
router.get('/', savingsController.readAll)
router.put('/', savingsController.update)
router.delete('/', savingsController.deleting)

export default router

