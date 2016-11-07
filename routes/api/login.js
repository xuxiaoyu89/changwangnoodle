const express = require('express');
const router = express.Router();
const models = require('../../models');

router.post('/login', (req, res) => {
	console.log(req.body);
	res.status(200).send({"status": "success"});
});

module.exports = router;