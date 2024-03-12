const router = require('express').Router();
const usersRoutes = require('./users');
const swaggerRoutes = require('./swagger');

router.use('/', swaggerRoutes);

router.get("/", (req, res) => {
    //#swagger.tags=['Hello World]
    res.send("Hello world");
});

router.use('/users', usersRoutes);

module.exports = router;
