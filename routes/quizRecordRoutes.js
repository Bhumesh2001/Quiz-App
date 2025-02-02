const express = require('express');
const router = express.Router();

// **Quiz record controller**
const quizRecordController = require('../controllers/quizRecordController');

// **Authenticaiton and validation**
const { authenticate, authorize } = require('../middlewares/authMiddle');
const { validateObjectIds } = require('../middlewares/objectIdMiddle');
const { cacheMiddleware } = require("../middlewares/cacheMiddle");

/**
 * Route for getting all quiz records of a specific user
 * GET: /quiz-record/user/:userId
 */
router.get(
    '/user/:userId', 
    authenticate, 
    validateObjectIds(['userId'], 'params'), 
    cacheMiddleware,
    quizRecordController.getUserQuizRecords
);

/**
 * Route for getting a specific quiz record by userId and quizId
 * GET: /quiz-record/user/:userId/quiz/:quizId
 */
router.get(
    '/user/:userId/quiz/:quizId', 
    authenticate, 
    validateObjectIds(['userId', 'quizId'], 'params'),
    cacheMiddleware,
    quizRecordController.getQuizRecordByUserAndQuiz
);

/**
 * Route for updating a quiz record (score, attempts)
 * PUT: /quiz-record/user/:userId/quiz/:quizId
 */
router.put(
    '/user/:userId/quiz/:quizId', 
    authenticate, 
    authorize(['admin']), 
    validateObjectIds(['userId', 'quizId'], 'params'),
    quizRecordController.updateQuizRecord
);

module.exports = router;
