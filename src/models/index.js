const Movie = require('./Movies');
const Actor = require('./Actors');
const Directors = require('./Directors')
const Genres = require('./Genres')

//relacion de uno a muchos entre peliculas y actores, peliculas y directores, peliculas y genros
Movie.hasMany(Actor);
Actor.belongsTo(Movie);

Movie.hasMany(Directors);
Directors.belongsTo(Movie);

Movie.hasMany(Genres);
Genres.belongsTo(Actor);








