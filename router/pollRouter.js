const express = require("express");
const { reg, getAll, weeklyVote, setScore, resetPoll, createPolls, removeUserFromPoll } = require("../controllers/pollController")

const router = express.Router();

router
    .route('/getall')
    .get(getAll);


router
    .route('/weeklyVote')
    .post(weeklyVote);

router
    .route('/setScore')
    .post(setScore);

router
    .route('/resetPoll')
    .get(resetPoll);

router
    .route('/createPolls')
    .get(createPolls);

router
    .route('/deleteFromPoll')
    .patch(removeUserFromPoll);

module.exports = router;