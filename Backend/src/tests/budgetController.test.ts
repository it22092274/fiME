import request from 'supertest';
import app from '../app'; // Adjust the import to your main app file

describe('Budget API', () => {
    let budgetId: string;

    it('should create a new budget', async () => {
        const response = await request(app)
            .post('/api/budgets/add')
            .send({
                name: 'Test Budget',
                totalAmount: 500,
                startDate: new Date(),
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        budgetId = response.body._id; // Save the ID for future tests
    });

    it('should get all budgets', async () => {
        const response = await request(app).get('/api/budgets');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should update a budget', async () => {
        const response = await request(app)
            .put('/api/budgets/update')
            .send({
                id: budgetId,
                expenditure: 100
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('remainingAmount');
    });

    it('should delete a budget', async () => {
        const response = await request(app)
            .delete('/api/budgets/delete')
            .send({ id: budgetId });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Budget deleted successfully');
    });
});
