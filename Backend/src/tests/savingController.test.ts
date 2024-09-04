import request from 'supertest';
import app from '../app'; // Adjust the import to your main app file

describe('Saving API', () => {
    let savingId: string;

    it('should create a new saving', async () => {
        const response = await request(app)
            .post('/api/savings/add')
            .send({
                title: 'Test Saving',
                startedDate: new Date(),
                period: 6,
                netAmount: 1000
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        savingId = response.body._id; // Save the ID for future tests
    });

    it('should get all savings', async () => {
        const response = await request(app).get('/api/savings');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should update a saving', async () => {
        const response = await request(app)
            .put('/api/savings/update')
            .send({
                id: savingId,
                title: 'Updated Test Saving',
                startedDate: new Date(),
                period: 12,
                netAmount: 1200
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Test Saving');
    });

    it('should delete a saving', async () => {
        const response = await request(app)
            .delete('/api/savings/delete')
            .send({ id: savingId });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Saving deleted successfully');
    });
});
