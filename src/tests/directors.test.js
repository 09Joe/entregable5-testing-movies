const request = require('supertest');
const app = require('../app');

test('GET /directors debe TRAER todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

let id;

test('POST /directors debe CREAR un director', async() => {

    const newDirector = {
        firstName: "Guillermo",
        lastName: "del Toro",
        nationality: "Mexico",
        image: "https://image.com",
        birthday: "1993-09-09",
    }
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newDirector.name);
});

test('PUT/ directors/:id debe actualizar un director', async () => {
    const updateDirector = {
        firstName: "Guillermo updated",
    }
    const res = await request(app).put('/directors/'+id).send(updateDirector);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateDirector.name);
});

test('DELETE/ directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete('/directors/'+id);
    expect(res.status).toBe(204);
});