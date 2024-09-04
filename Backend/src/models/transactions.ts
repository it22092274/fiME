import mongoose, { Document, Schema } from 'mongoose';

// Interface for Transaction Document
interface ITransaction extends Document {
    description: string;
    transactionDate: Date;
    amount: number;
    type: 'income' | 'expense'; // Restrict type to either 'income' or 'expense'
    relatedSaving?: mongoose.Schema.Types.ObjectId; // Reference to Saving schema if applicable
    category: string;
}

// Transaction Schema Definition
const transactionSchema: Schema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true, // Optional: removes spaces from start and end of the string
        },
        transactionDate: {
            type: Date,
            default: Date.now, // Default to the current date
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ['income', 'expense'], // Only allow 'income' or 'expense'
            required: true,
        },
        relatedSaving: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the Saving schema (if applicable)
            ref: 'Saving', // Name of the related model (Saving)
        },
        category: {
            type: String,
            required: true, // Category (e.g., Food, Travel, etc.)
        },
    },
    { timestamps: true }
);

// Pre-save middleware to validate amount
transactionSchema.pre<ITransaction>('save', function (next) {
    if (this.amount <= 0) {
        throw new Error('Transaction amount must be positive.');
    }
    next();
});

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
