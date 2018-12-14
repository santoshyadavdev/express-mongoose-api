const movieModel = require('../models/movies');

module.exports = {
    getById: (req, res, next) => {
        movieModel.findById(req.params.movieId, (err, result) => {
            if (err) {
                next(err);
            } else {
                res.json({ status: 'success', message: 'Movie Found', data: { movies: result } });
            }
        })
    },

    getAll: (req, res, next) => {
        let movieList = [];

        movieModel.find({}, (err, result) => {
            if (err) {
                next(err)
            } else {
                console.log(result);
                for (let movie of result) {
                    movieList.push({
                        id: result._id,
                        name: result.name,
                        released_on: result.released_on
                    });
                }
                res.json({ status: 'success', message: 'Movies List found', data: { movies: result } });
            }
        })
    },

    updateById: (req, res, next) => {
        movieModel.findByIdAndUpdate(req.params.movieid, { name: req.body.name }, (err, result) => {
            if (err) {
                next(err)
            } else {
                res.json({ status: 'success', message: 'Movies updated', data: null });
            }
        });
    },

    create: (req, res, next) => {
        movieModel.create({ name: req.body.name, released_on: req.body.released_on }, (err, result) => {
            if(err){
                next(err);
            } else {
                res.json({ status: 'success', message: 'Movie Added!', data: result });
            }
        });
    }
}