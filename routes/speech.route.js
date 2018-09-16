const router = require('express').Router();
const controller = require('../controllers/speech.controller');


// Get Routes...
router.get('/', controller.index);


// POST Routes...
router.post('/', controller.create);
router.post('/analyze', controller.analyze);


module.exports = router;
