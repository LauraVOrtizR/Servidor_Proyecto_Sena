const { Router } = require('express');
const router = Router();

//routes
router.get('/usuarios', (req, res) => {
    res.json({"message": "Listado de usuarios"});
});

module.exports = router;