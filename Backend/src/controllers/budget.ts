import { Request, Response } from 'express';
import Budget from '../models/budget';

// Add a new budget
const add = async (request: Request, response: Response) => {
    const { name, totalAmount, startDate, endDate } = request.body;

    try {
        const newBudget = new Budget({
            name,
            totalAmount,
            startDate,
            endDate,
            remainingAmount: totalAmount,
        });

        const savedBudget = await newBudget.save();

        response.status(201).json(savedBudget);
    } catch (e) {
        console.error('An error occurred while adding budget:', e);
        response.status(500).json({ message: 'Error occurred while adding budget' });
    }
}

// Get all budgets
const readAll = async (request: Request, response: Response) => {
    try {
        const allBudgets = await Budget.find({});
        response.status(200).json(allBudgets);
    } catch (e) {
        console.error('Error fetching budgets:', e);
        response.status(500).json({ message: 'Error occurred while fetching budgets' });
    }
}

// Update a budget
const update = async (request: Request, response: Response) => {
    const { id, expenditure } = request.body;

    if (typeof expenditure !== 'number' || expenditure < 0) {
        return response.status(400).json({ message: 'Invalid expenditure amount' });
    }

    try {
        // Find the budget by ID
        const budget = await Budget.findById(id);

        if (!budget) {
            return response.status(404).json({ message: 'Budget not found' });
        }

        // Update the remaining amount
        const remainingAmount = budget.remainingAmount - expenditure;

        const updatedBudget = await Budget.findByIdAndUpdate(
            id,
            { remainingAmount },
            { new: true } // Return the updated document
        );

        if (!updatedBudget) {
            return response.status(404).json({ message: 'Budget not found' });
        }

        response.status(200).json(updatedBudget);
    } catch (e) {
        console.error('Error updating budget:', e);
        response.status(500).json({ message: 'Error occurred while updating budget' });
    }
}

// Delete a budget
const deleting = async (request: Request, response: Response) => {
    const { id } = request.body;

    try {
        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return response.status(404).json({ message: 'Budget not found' });
        }

        response.status(200).json({ message: 'Budget deleted successfully', deletedBudget });
    } catch (e) {
        console.error('Error deleting budget:', e);
        response.status(500).json({ message: 'Error occurred while deleting budget' });
    }
}

export default { add, readAll, update, deleting };
