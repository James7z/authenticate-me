const router = require('express').Router();


//Test the API Router
router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
