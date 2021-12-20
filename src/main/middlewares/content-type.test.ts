import request from 'supertest';
import app from '../config/app';

describe('Content Type Middleware', () => {
    test('Garantir que o formato default do content type seja JSON', async () => {
        app.get('/test_content_type', (req, res) => res.send(''));

        await request(app)
            .get('/test_content_type')
            .expect('content-type', /json/);
    })
});
