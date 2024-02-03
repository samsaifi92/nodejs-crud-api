module.exports = app => {
    const fakes = require('../controllers/fakes'); // ++++++
    var router = require('express').Router();

    router.get('/', fakes.create);
    app.use('/api/fake', router);
}