import mongoose , { Document, Schema} from "mongoose";

interface IBudget extends Document {
    totalAmount: number,
    startDate: Date,
    endDate: Date,
    remainingAmount:number,
}

const budgetSchema : Schema =  new mongoose.Schema({
    totalAmount: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now, // Defaults to current date
    },
    endDate: {
        type: Date,
        required: true, // Ensures the end date is always provided
    },
    remainingAmount: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const Budget = mongoose.model<IBudget>('Budget', budgetSchema)

export default Budget