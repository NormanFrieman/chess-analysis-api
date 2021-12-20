import request from 'supertest';
import app from '../config/app';

describe('BodyParser Middleware', () => {
    test('Garantir que o body parser seja JSON', async () => {
        app.post('/test_body_parser', (req, res) => res.send(req.body));

        await request(app)
            .post('/test_body_parser')
            .send({ name: 'Valid User' })
            .expect({ name: 'Valid User' });
    })
}) 