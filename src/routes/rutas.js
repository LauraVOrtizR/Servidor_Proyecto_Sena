const { Router } = require('express');
const router = Router();

//routes
router.get('/', (req, res) => {
    res.json({"message": "Bienvenido a mi REST API"});
});

module.exports = router;