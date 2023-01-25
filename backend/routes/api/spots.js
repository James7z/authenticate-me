const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Sequelize } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
    check('address')
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .notEmpty()
        .withMessage("City is required"),
    check('state')
        .notEmpty()
        .withMessage("State is required"),
    check('country')
        .notEmpty()
        .withMessage("Country is required"),
    check('lat')
        .notEmpty()
        .withMessage("Latitude is required"),
    check('lat')
        .custom(value => {
            //console.log(typeof value, value);
            if (isNaN(value)) return Promise.reject();
            if (value > 90 || value < -90) return Promise.reject();
            return true;
        })
        .withMessage("Latitude is not valid"),
    check('lng')
        .notEmpty()
        .withMessage("Longitude is required"),
    check('lng')
        .custom(value => {
            if (isNaN(value) || value >= 180 || value < -180) return Promise.reject();
            return true;
        })
        .withMessage("Longitude is not valid"),
    check('name')
        .notEmpty()
        .withMessage("Name is required"),
    check('name')
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .notEmpty()
        .withMessage("Description is required"),
    check('price')
        .notEmpty()
        .withMessage("Price per day is required"),
    check('price')
        .custom(value => {
            if (isNaN(value) || value < 0) return Promise.reject();
            return true;
        })
        .withMessage("Price per day is invalid"),
    handleValidationErrors
]

//spot id check
const spotIdCheck = async (req, res, next) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const { user } = req;

    if (user.id != spot.ownerId) {
        const err = new Error('Authentication required');
        err.title = 'Authentication required';
        err.errors = ['Only the owner of the spot has the Authentication'];
        err.status = 401;
        return next(err);
    }
    return next();
}

// Get all Spots
router.get('/', async (req, res) => {
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
router.get('/current', requireAuth, async (req, res) => {
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


// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = user.id;

    const newSpot = await Spot.create({
        ownerId, address, city, state, country,
        lat, lng, name, description, price
    });
    return res.status(201).json(newSpot);
})


//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, spotIdCheck, async (req, res, next) => {
    const spotId = req.params.spotId

    const { url, preview } = req.body;

    let newSpotImage = await SpotImage.create({ spotId, url, preview });
    newSpotImage = newSpotImage.toJSON();
    delete newSpotImage.spotId;
    delete newSpotImage.updatedAt;
    delete newSpotImage.createdAt;
    res.status(200).json(newSpotImage);
})

//Edit a Spot
router.put('/:spotId', requireAuth, spotIdCheck, validateSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    await spot.update({ ...req.body })

    res.json(spot);

})

//Delete a spot
router.delete('/:spotId', requireAuth, spotIdCheck, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    await spot.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
