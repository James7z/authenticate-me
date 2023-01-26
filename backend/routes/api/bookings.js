const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Sequelize, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//booking id check
const bookingIdCheck = async (req, res, next) => {
    const bookingId = req.params.bookingId
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    return next();
}

const userIdCheck = async (req, res, next) => {
    const { user } = req;
    const bookingId = req.params.bookingId
    const booking = await Booking.findByPk(bookingId);
    if (user.id != booking.userId) {
        const err = new Error('Authentication required');
        err.title = 'Authentication required';
        err.errors = ['Only the owner of the booking has the Authentication'];
        err.status = 401;
        return next(err);
    }
    return next();
}

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    const bookings = await Booking.findAll({
        include: [{
            model: Spot,
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            },
            include: {
                model: SpotImage,
                attributes: ['url', 'preview']
            }
        }],
        where: {
            userId: user.id
        }
    })

    const bookingsList = [];

    bookings.forEach(booking => bookingsList.push(booking.toJSON()));

    bookingsList.forEach(booking => {
        // "previewImage"
        booking.Spot.SpotImages.forEach(image => {
            if (image.preview === true) booking.Spot.previewImage = image.url;
        })
        if (!booking.Spot.previewImage) booking.Spot.previewImage = "No preview image for this spot"
        delete (booking.Spot.SpotImages);
        delete (booking.Spot.description);
    })

    res.json({
        "Bookings": bookingsList
    });
})

//Edit a Booking
router.put('/:bookingId', requireAuth, bookingIdCheck, userIdCheck, async (req, res) => {

    const bookingId = req.params.bookingId
    let booking = await Booking.findByPk(bookingId);

    const spot = await Spot.findByPk(booking.spotId, {
        include: [{
            model: Booking,
            attributes: ["id", "startDate", "endDate"]
        }]
    });

    const { startDate, endDate } = req.body;
    const startDateVal = (new Date(startDate)).getTime();
    const endDateVal = (new Date(endDate)).getTime();
    const prevStartDateVal = (new Date(booking.startDate)).getTime();
    const prevEndDateVal = (new Date(booking.endDate)).getTime();
    const todayVal = Date.now();

    if (endDateVal <= startDateVal) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": [
                "endDate cannot be on or before startDate"
            ]
        })
    }

    if (todayVal >= prevEndDateVal || todayVal >= endDateVal) {
        return res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    }

    for (let booking of spot.Bookings) {
        if (booking.id == bookingId) continue;
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

    const { user } = req;
    const spotId = spot.id
    const userId = user.id

    let newBooking = await booking.update({ spotId, userId, startDate, endDate });

    return res.json(newBooking)
})


//Delete a Booking
router.delete('/:bookingId', requireAuth, bookingIdCheck, userIdCheck, async (req, res) => {
    const bookingId = req.params.bookingId
    let booking = await Booking.findByPk(bookingId);
    // const startDateVal = (new Date(booking.startDate))
    // console.log(startDateVal)
    const startDateVal = (new Date(booking.startDate)).getTime();
    const todayVal = Date.now();
    if (todayVal >= startDateVal) {
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }

    await booking.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });

})

module.exports = router;
