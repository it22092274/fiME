import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db';

//route imports
import TransactionRoute from './routes/transactions'
import BudgetRoute from './routes/budget'
import SavingsRoute from './routes/savings'

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Application = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/transaction', TransactionRoute)
app.use('/api/budget', BudgetRoute)
app.use('/api/savings', SavingsRoute)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app