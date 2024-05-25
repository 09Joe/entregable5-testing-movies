const request = require('supertest');
const app = require('../app');

test('GET /actors debe TRAER todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

let id;

test('POST /actors debe CREAR un artista', async() => {

    const newActor = {
        firstName: "Elias",
        lastName: "Mitch",
        nationality: "America",
        image: "https://image.com",
        birthday: "1993-09-09",
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newActor.name);
});

test('PUT/ actors/:id debe actualizar un artista', async () => {
    const updateActor = {
        firstName: "Elias Updated",
    }
    const res = await request(app).put('/actors/'+id).send(updateActor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateActor.name);
});

test('DELETE/ actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete('/actors/'+id);
    expect(res.status).toBe(204);
});

