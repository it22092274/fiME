import { Request, Response } from 'express';
import Transaction from "../models/transactions";


// Add a new transaction
const add = async (request: Request, response: Response) => {
    const { description, transactionDate, amount, type } = request.body;

    try {
        const newTransaction = new Transaction({
            description,
            transactionDate,
            amount,
            type
        });

        const savedTransaction = await newTransaction.save();

        response.status(201).json(savedTransaction);
    } catch (e) {
        console.error('An error occurred while adding transaction:', e);
        response.status(500).json({ message: 'Error occurred while adding transaction' });
    }
}

// Get all transactions
const readAll = async (request: Request, response: Response) => {
    try {
        const allTransaction = await Transaction.find({});
        response.status(200).json(allTransaction);
    } catch (e) {
        console.error('Error fetching transactions:', e);
        response.status(500).json({ message: 'Error occurred while fetching transactions' });
    }
}

// Update a transaction
const update = async (request: Request, response: Response) => {
    const { id, description, transactionDate, amount, type } = request.body;

    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { description, transactionDate, amount, type },
            { new: true } // Return the updated document
        );

        if (!updatedTransaction) {
            return response.status(404).json({ message: 'Transaction not found' });
        }

        response.status(200).json(updatedTransaction);
    } catch (e) {
        console.error('Error updating transaction:', e);
        response.status(500).json({ message: 'Error occurred while updating transaction' });
    }
}

// Delete a transaction
const deleting = async (request: Request, response: Response) => {
    const { id } = request.body;

    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return response.status(404).json({ message: 'Transaction not found' });
        }

        response.status(200).json({ message: 'Transaction deleted successfully', deletedTransaction });
    } catch (e) {
        console.error('Error deleting transaction:', e);
        response.status(500).json({ message: 'Error occurred while deleting transaction' });
    }
}

export default { add, readAll, update, deleting };
