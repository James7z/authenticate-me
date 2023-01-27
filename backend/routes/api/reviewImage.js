const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Sequelize, Booking, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//review id check
const reviewImageIdCheck = async (req, res, next) => {
    const reviewImageId = req.params.reviewImageId
    const reviewImage = await ReviewImage.findByPk(reviewImageId);
    if (!reviewImage) {
        return res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    return next();
}

const userIdCheck = async (req, res, next) => {
    const { user } = req;
    const reviewImageId = req.params.reviewImageId
    const reviewImage = await ReviewImage.findByPk(reviewImageId,
        {
            include: [{
                model: Review,
                attributes: ['userId']
            }],
            attributes: ['reviewId']
        });
    if (user.id != reviewImage.Review.userId) {
        const err = new Error('Authentication required');
        err.title = 'Authentication required';
        err.errors = ['Only the owner of the Review has the Authentication'];
        err.status = 401;
        return next(err);
    }
    return next();
}


router.delete('/:reviewImageId', requireAuth, reviewImageIdCheck, userIdCheck, async (req, res) => {
    const reviewImageId = req.params.reviewImageId
    const reviewImage = await ReviewImage.findByPk(reviewImageId);

    reviewImage.destroy();

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
