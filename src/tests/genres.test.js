const request = require('supertest');
const app = require('../app');


test('GET /genres debe TRAER todos los generos', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

let id;

test('POST /genres debe CREAR un genero', async() => {

    const newGenre = {
        name: "Terror",
    }
    const res = await request(app).post('/genres').send(newGenre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newGenre.name);
});

test('PUT/ genres/:id debe actualizar un genero', async () => {
    const updateGenre = {
        name: "Terror Updated",
    }
    const res = await request(app).put('/genres/'+id).send(updateGenre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateGenre.name);
});

test('DELETE/ genres/:id debe eliminar un genero', async () => {
    const res = await request(app).delete('/genres/'+id);
    expect(res.status).toBe(204);
});