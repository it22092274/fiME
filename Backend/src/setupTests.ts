import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to test database
beforeAll(async () => {
    const url = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(url);
});

// Close database connection after all tests
afterAll(async () => {
    await mongoose.disconnect();
});
