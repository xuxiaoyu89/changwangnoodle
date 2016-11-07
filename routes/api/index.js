const express = require('express');
const router = express.Router();

router.use(require('./login.js'));
module.exports = router;