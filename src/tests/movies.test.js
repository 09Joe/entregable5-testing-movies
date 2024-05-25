const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');

test('GET /movies debe TRAER todas los peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

let id;

test('POST /movies debe CREAR una pelicula', async() => {

    const newMovie = {
        name: "500Summer",
        image: "https://image.com",
        synopsis: "una comedia romantica y psicologica ",
        releaseYear: 2010,
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
});

test('PUT/ movies/:id debe actualizar una pelicula', async () => {
    const updateMovie = {
        name: "Summer updated",
    }
    const res = await request(app).put('/movies/'+id).send(updateMovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateMovie.name);
});

test('POST/ movies/:id/actors debe insertar un actor a una pelicula', async () => {
    const actor = await Actors.create({
        firstName: "Keannu",
        lastName: "Reaves",
        nationality: "american",
        image: "https://images.com",
        birthday: "1999-09-09",
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);   
});

test('POST/ movies/:id/directors debe insertar un director a una pelicula', async () => {
    const director = await Directors.create({
        firstName: "Quentin",
        lastName: "Tarantino",
        nationality: "american",
        image: "https://images2.com",
        birthday: "1963-03-27",
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);   
});


test('POST/ movies/:id/genres debe insertar un genero a una pelicula', async () => {
    const genre = await Genres.create({
        name: "Horror",
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);   
});




test('DELETE/ movies/:id debe eliminar una pelicula', async () => {
    const res = await request(app).delete('/movies/'+id);
    expect(res.status).toBe(204);
});