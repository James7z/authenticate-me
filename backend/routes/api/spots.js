const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Get all Spots

router.get('/',
    async (req, res) => {
        const spots = await Spot.findAll({
            include: [{
                model: Review,
                attributes: ["stars"]
            },
            {
                model: SpotImage,
                attributes: ["url", "preview"],

            }
            ],
        })

        let spotsList = [];

        spots.forEach(spot => spotsList.push(spot.toJSON()));
        //console.log(spotsList)

        spotsList.forEach(spot => {
            // avgStarRating
            if (spot.Reviews.length > 0) {
                let total = spot.Reviews.reduce((sum, review) => {
                    //console.log(typeof review.stars)
                    return sum += +review.stars;
                }, 0);
                console.log(total)
                spot.avgStarRating = total / spot.Reviews.length;
            } else spot.avgStarRating = 'No Review for this spot';

            // "previewImage"
            spot.SpotImages.forEach(image => {
                if (image.preview === true) spot.previewImage = image.url;
            })
            if (!spot.previewImage) spot.previewImage = "No preview image for this spot"

            delete (spot.Reviews);
            delete (spot.SpotImages);
        })
        return res.json(spotsList);
    })

//Get all Spots owned by the Current User
router.get('/current',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const spots = await Spot.findAll({
            include: [{
                model: Review,
                attributes: ["stars"]
            },
            {
                model: SpotImage,
                attributes: ["url", "preview"]
            }],
            where: {
                ownerId: user.id
            }
        })

        let spotsList = [];

        spots.forEach(spot => spotsList.push(spot.toJSON()));
        //console.log(spotsList)

        spotsList.forEach(spot => {
            // avgStarRating
            if (spot.Reviews.length > 0) {
                let total = spot.Reviews.reduce((sum, review) => {
                    return sum += +review.stars;
                }, 0);
                console.log(total)
                spot.avgStarRating = total / spot.Reviews.length;
            } else spot.avgStarRating = 'No Review for this spot';
            // "previewImage"
            spot.SpotImages.forEach(image => {
                if (image.preview === true) spot.previewImage = image.url;
            })
            if (!spot.previewImage) spot.previewImage = "No preview image for this spot"
            delete (spot.Reviews);
            delete (spot.SpotImages);
        })
        return res.json(spotsList);
    }
)

module.exports = router;
