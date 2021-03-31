const express = require("express");
const { getAll, changeUser, reg } = require("../controllers/footballersController")

const router = express.Router();

router
    .route('/changeUser')
    .post(changeUser);

router
    .route('/getAll')
    .get(getAll);

router
    .route('/reg')
    .post(reg);


module.exports = router;