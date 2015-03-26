module.exports = function (app, trending) {
var  cors = require('cors');
var corsOptions = {
  origin: '*'
};

    app.get('/languages', cors(corsOptions), function(req, res, next) {

        trending.languages(function (err, languages) {
            res.json(languages); // => ['ABAP', 'ActionScript', 'Ada', ...]
        });
    });

    app.get('/', cors(corsOptions), function (req, res, next) {

        trending(function (err, repos) {
            res.json(repos);
        });
    });

    app.get('/languages/:language', cors(corsOptions),function (req, res,next) {
        trending(req.params.language, function (err, repos) {
            res.json(repos);
        });
    });
   };



