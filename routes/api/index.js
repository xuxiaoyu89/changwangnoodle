const express = require('express');
const router = express.Router();

router.use(require('./login.js'));
router.use(require('./signup.js'));
router.use(require('./user.js'));
module.exports = router;