const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Sequelize, Booking, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//review id check
const reviewIdCheck = async (req, res, next) => {
    const reviewId = req.params.reviewId
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    return next();
}

const userIdCheck = async (req, res, next) => {
    const { user } = req;
    const reviewId = req.params.reviewId
    const review = await review.findByPk(reviewId);
    if (user.id != review.userId) {
        const err = new Error('Authentication required');
        err.title = 'Authentication required';
        err.errors = ['Only the owner of the Review has the Authentication'];
        err.status = 401;
        return next(err);
    }
    return next();
}

//Get all of the Current User's Reviews
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const reviews = await Review.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "description"]
                },
                include: {
                    model: SpotImage,
                    attributes: ['url', 'preview']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ],
        where: { userId: user.id }
    })

    const reviewsList = [];

    reviews.forEach(review => reviewsList.push(review.toJSON()));

    reviewsList.forEach(review => {
        // "previewImage"
        review.Spot.SpotImages.forEach(image => {
            if (image.preview === true) review.Spot.previewImage = image.url;
        })
        if (!review.Spot.previewImage) review.Spot.previewImage = "No preview image for this spot"
        delete (review.Spot.SpotImages);

    })

    res.json({
        "Reviews": reviewsList
    });
})


module.exports = router;
