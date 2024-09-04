import { Request, Response } from 'express';
import Saving from '../models/savings';

// Add a new saving
const add = async (request: Request, response: Response) => {
    const { title, startedDate, period, netAmount, currentAmount } = request.body;

    try {
        const newSaving = new Saving({
            title,
            startedDate,
            period,
            netAmount,
            currentAmount
        });

        const savedSaving = await newSaving.save();

        response.status(201).json(savedSaving);
    } catch (e) {
        console.error('An error occurred while adding saving:', e);
        response.status(500).json({ message: 'Error occurred while adding saving' });
    }
}

// Get all savings
const readAll = async (request: Request, response: Response) => {
    try {
        const allSavings = await Saving.find({});
        response.status(200).json(allSavings);
    } catch (e) {
        console.error('Error fetching savings:', e);
        response.status(500).json({ message: 'Error occurred while fetching savings' });
    }
}

// Update a saving
const update = async (request: Request, response: Response) => {
    const { id, title, startedDate, period, netAmount, currentAmount } = request.body;

    try {
        const updatedSaving = await Saving.findByIdAndUpdate(
            id,
            {
                title,
                startedDate,
                period,
                netAmount,
                currentAmount
            },
            { new: true } // Return the updated document
        );

        if (!updatedSaving) {
            return response.status(404).json({ message: 'Saving not found' });
        }

        response.status(200).json(updatedSaving);
    } catch (e) {
        console.error('Error updating saving:', e);
        response.status(500).json({ message: 'Error occurred while updating saving' });
    }
}

// Delete a saving
const deleting = async (request: Request, response: Response) => {
    const { id } = request.body;

    try {
        const deletedSaving = await Saving.findByIdAndDelete(id);

        if (!deletedSaving) {
            return response.status(404).json({ message: 'Saving not found' });
        }

        response.status(200).json({ message: 'Saving deleted successfully', deletedSaving });
    } catch (e) {
        console.error('Error deleting saving:', e);
        response.status(500).json({ message: 'Error occurred while deleting saving' });
    }
}

export default { add, readAll, update, deleting };
