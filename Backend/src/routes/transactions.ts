import express from "express";
import transactionController from '../controllers/transactions'

const router = express.Router()

router.post('/', transactionController.add)
router.get('/', transactionController.readAll)
router.put('/', transactionController.update)
router.delete('/', transactionController.deleting)

export default router

