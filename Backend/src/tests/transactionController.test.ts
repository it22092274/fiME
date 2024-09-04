import request from 'supertest';
import app from '../app'; // Adjust the import to your main app file
import mongoose from 'mongoose';

describe('Transaction API', () => {
    let transactionId: string;

    it('should create a new transaction', async () => {
        const response = await request(app)
            .post('/api/transactions/add')
            .send({
                description: 'Test Transaction',
                transactionDate: new Date(),
                amount: 100,
                type: 'expense'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        transactionId = response.body._id; // Save the ID for future tests
    });

    it('should get all transactions', async () => {
        const response = await request(app).get('/api/transactions');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should update a transaction', async () => {
        const response = await request(app)
            .put('/api/transactions/update')
            .send({
                id: transactionId,
                description: 'Updated Test Transaction',
                transactionDate: new Date(),
                amount: 150,
                type: 'income'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('description', 'Updated Test Transaction');
    });

    it('should delete a transaction', async () => {
        const response = await request(app)
            .delete('/api/transactions/delete')
            .send({ id: transactionId });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Transaction deleted successfully');
    });
});
