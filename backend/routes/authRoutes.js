const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { login } = require('../controllers/authController');

=======
const { registrar, login } = require('../controllers/authController');

router.post('/registrar', registrar);
>>>>>>> 8265bff8923fca93423b93bed769fc29675fedde
router.post('/login', login);

module.exports = router;
