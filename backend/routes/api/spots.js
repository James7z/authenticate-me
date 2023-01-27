const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Sequelize, Booking, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check, query } = require('express-validator');
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
            if (isNaN(value) || value > 90 || value < -90) return Promise.reject();
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

const validQuery = [
    query('page')
        .optional()
        .custom(value => {
            if (isNaN(value) || !Number.isInteger(+value) || +value > 10 || +value < 0) return Promise.reject();
            return true;
        })
        .withMessage("Page must be an integer from 0 to 10"),
    query('size')
        .optional()
        .custom(value => {
            if (isNaN(value) || !Number.isInteger(+value) || +value > 20 || +value < 0) return Promise.reject();
            return true;
        })
        .withMessage("Size must be an integer from 0 to 20"),
    query('minLat')
        .optional()
        .custom(value => {
            if (isNaN(value) || value > 90 || value < -90) return Promise.reject();
            return true;
        })
        .withMessage("Minimum latitude is invalid"),
    query('maxLat')
        .optional()
        .custom(value => {
            if (isNaN(value) || value > 90 || value < -90) return Promise.reject();
            return true;
        })
        .withMessage("Maxium latitude is invalid"),
    query('minLng')
        .optional()
        .custom(value => {
            if (isNaN(value) || value >= 180 || value < -180) return Promise.reject();
            return true;
        })
        .withMessage("Minimum longitude is invalid"),
    query('maxLng')
        .optional()
        .custom(value => {
            if (isNaN(value) || value >= 180 || value < -180) return Promise.reject();
            return true;
        })
        .withMessage("Maxium longitude is invalid"),
    query('minPrice')
        .optional()
        .custom(value => {
            if (isNaN(value) || value < 0) return Promise.reject();
            return true;
        })
        .withMessage("Maximum price must be greater than or equal to 0"),
    query('maxPrice')
        .optional()
        .custom(value => {
            if (isNaN(value) || value < 0) return Promise.reject();
            return true;
        })
        .withMessage("Maximum price must be greater than or equal to 0"),
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
    return next();
}

const userIdCheck = async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId);
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
router.get('/', validQuery, async (req, res) => {
    const { Op } = require('sequelize');
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const pagination = {};

    if (!page) page = 0;
    if (!size) size = 20;
    pagination.limit = size;
    pagination.offset = page * size;

    const where = {};
    let latGte = {};
    let latLte = {};
    let lngGte = {};
    let lngLte = {};
    let priceGte = {}
    let priceLte = {};

    if (minLat) latGte = { [Op.gte]: minLat };
    if (maxLat) latLte = { [Op.lte]: maxLat };
    if (minLat || maxLat) where.lat = { ...latGte, ...latLte };
    if (minLng) lngGte = { [Op.gte]: minLng };
    if (maxLng) lngLte = { [Op.lte]: maxLng };
    if (minLng || maxLng) where.lng = { ...lngGte, ...lngLte };
    if (minPrice) priceGte = { [Op.gte]: minPrice };
    if (maxPrice) priceLte = { [Op.lte]: maxPrice };
    if (minPrice || maxPrice) where.price = { ...priceGte, ...priceLte };

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
        where,
        ...pagination
    })

    let spotsList = [];

    spots.forEach(spot => spotsList.push(spot.toJSON())); // POJO obj
    //console.log(spotsList)

    spotsList.forEach(spot => {
        // avgStarRating
        if (spot.Reviews.length > 0) {
            let total = spot.Reviews.reduce((sum, review) => {
                //console.log(typeof review.stars)
                return sum += +review.stars;
            }, 0);
            //console.log(total)
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
    return res.json({ "Spots": spotsList });
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
    return res.json({ "Spots": spotsList });
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
router.post('/:spotId/images', requireAuth, spotIdCheck, userIdCheck, async (req, res, next) => {
    const spotId = req.params.spotId

    const { url, preview } = req.body;

    let newSpotImage = await SpotImage.create({ spotId, url, preview });
    newSpotImage = newSpotImage.toJSON();
    delete newSpotImage.spotId;
    delete newSpotImage.updatedAt;
    delete newSpotImage.createdAt;
    return res.status(200).json(newSpotImage);
})

//Edit a Spot
router.put('/:spotId', requireAuth, spotIdCheck, userIdCheck, validateSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    await spot.update({ ...req.body })

    res.json(spot);

})

//Delete a spot
router.delete('/:spotId', requireAuth, spotIdCheck, userIdCheck, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    await spot.destroy();

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, spotIdCheck, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId
    const userId = user.id
    const spot = await Spot.findByPk(spotId, {
        include: [{
            model: Booking,
            attributes: ["startDate", "endDate"]
        }]
    });
    if (userId == spot.ownerId) {
        const err = new Error('Authentication required');
        err.title = 'Authentication required';
        err.errors = ['The owner of the spot could not book the spot'];
        err.status = 401;
        return next(err);
    }

    const { startDate, endDate } = req.body;
    // let startDateD = new Date(startDate);
    // console.log(startDateD);
    const startDateVal = (new Date(startDate)).getTime();
    const endDateVal = (new Date(endDate)).getTime();
    if (endDateVal <= startDateVal) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": [
                "endDate cannot be on or before startDate"
            ]
        })
    }

    for (let booking of spot.Bookings) {
        let exitsStartDateVal = (new Date(booking.startDate)).getTime();
        let exitsEndDateVal = (new Date(booking.endDate)).getTime();
        if (startDateVal > exitsEndDateVal || endDateVal < exitsStartDateVal) { }
        else {
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": [
                    "Start date conflicts with an existing booking",
                    "End date conflicts with an existing booking"
                ]
            })
        }

    }
    let newBooking = await Booking.create({ spotId, userId, startDate, endDate });
    res.json(newBooking)
})


//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, spotIdCheck, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId
    const userId = user.id
    const spot = await Spot.findByPk(spotId);
    let bookings;
    if (userId == spot.ownerId) {
        bookings = await Booking.findAll({
            where: {
                spotId
            },
            include: [{
                model: User,
                attributes: ["id", "firstName", "lastName"]
            }]
        })
    } else {
        bookings = await Booking.findAll({
            where: {
                spotId
            },
            attributes: ["spotId", "startDate", "endDate"]
        })
    }

    res.json({ "Bookings": bookings });

})


//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', spotIdCheck, async (req, res, next) => {
    const spotId = req.params.spotId;
    const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }, {
            model: ReviewImage,
            attributes: ['id', 'url']
        }]
    })

    res.json({ "Reviews": reviews });
})


//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, spotIdCheck, validReview, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId
    const userId = user.id
    const { review, stars } = req.body;
    const spotReview = await Spot.findByPk(spotId, {
        include: [{
            model: Review,
            attributes: ['id', 'userId', 'spotId'],
            where: { userId: userId }
        }],
    });

    if (spotReview) {
        return res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    const newReview = await Review.create({ userId, spotId, review, stars });

    res.json(newReview);
})
module.exports = router;
