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
    const review = await Review.findByPk(reviewId, { attributes: ['id', 'userId'] });
    if (user.id != review.userId) {
        const err = new Error('Authentication required');
        err.title = 'Authentication required';
        err.errors = ['Only the owner of the Review has the Authentication'];
        err.status = 401;
        return next(err);
    }
    return next();
}

const validReview = [
    check('review')
        .notEmpty()
        .withMessage('Review text is required'),
    check('review')
        .isLength({ max: 500 })
        .withMessage('Please provide a review with 500 characters'),
    check('stars')
        .custom(value => {
            if (isNaN(value) || !Number.isInteger(+value) || +value > 5 || + value < 1) return Promise.reject();
            return true;
        })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]


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

//Add an Image to a Review based on the Review's id

router.post('/:reviewId/images', requireAuth, reviewIdCheck, userIdCheck, async (req, res) => {
    const { user } = req;
    const reviewId = req.params.reviewId
    const review = await Review.findByPk(reviewId, {
        include: [{
            model: ReviewImage
        }]
    });
    if (review.ReviewImages.length >= 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }
    const { url } = req.body;
    let newReviewImage = await ReviewImage.create({
        url, reviewId
    })

    newReviewImage = newReviewImage.toJSON();
    delete (newReviewImage.reviewId);
    delete (newReviewImage.createdAt);
    delete (newReviewImage.updatedAt);
    res.json(newReviewImage)
})


//Edit a Review
router.put('/:reviewId', requireAuth, reviewIdCheck, userIdCheck, validReview, async (req, res) => {

    const reviewId = req.params.reviewId
    let reviewSpot = await Review.findByPk(reviewId);
    const { user } = req;
    const userId = user.id

    const { review, stars } = req.body;

    await reviewSpot.update({ reviewId, userId, review, stars });

    return res.json(reviewSpot)
})


module.exports = router;
