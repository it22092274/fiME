import mongoose, { Document, Schema } from 'mongoose';

interface ISaving extends Document {
    title: string;
    startedDate: Date;
    period: number; // period in months
    netAmount: number;
    currentAmount?: number;
    expireDate: Date;
}

const savingSchema: Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        startedDate: {
            type: Date,
            default: Date.now,
        },
        period: {
            type: Number, // Change period to a number (months)
            required: true,
        },
        netAmount: {
            type: Number, // Should be a number
            required: true,
        },
        currentAmount: {
            type: Number,
        },
        expireDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

// Function to calculate expire date
function setExpireDate(startdate: Date, period: number): Date {
    const expireDate = new Date(startdate);
    expireDate.setMonth(expireDate.getMonth() + period); // Adds period in months to the start date
    return expireDate;
}

// Pre-save middleware to set expireDate
savingSchema.pre<ISaving>('save', function (next) {
    if (!this.expireDate) {
        this.expireDate = setExpireDate(this.startedDate, this.period);
    }
    next();
});

const Saving = mongoose.model<ISaving>('Saving', savingSchema);

export default Saving;
