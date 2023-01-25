const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//spot id check
const spotIdCheck = async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {

        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    next();
}

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
    })

//Get details of a Spot from an id
router.get('/:spotId', spotIdCheck, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId, {
        include: [{
            model: Review,
            attributes: ["stars"]
        },
        {
            model: SpotImage,
            attributes: ["id", "url", "preview"]
        },
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
        ],
    })
    spot = spot.toJSON();
    //console.log(spot)
    // avgStarRating
    spot.numReviews = spot.Reviews.length
    if (spot.Reviews.length > 0) {
        let total = spot.Reviews.reduce((sum, review) => {
            return sum += +review.stars;
        }, 0);
        //console.log(total)
        spot.avgStarRating = total / spot.Reviews.length;
    } else spot.avgStarRating = 'No Review for this spot';

    delete (spot.Reviews);
    spot.Owner = spot.User;
    delete spot.User;

    return res.json(spot);
})


module.exports = router;
