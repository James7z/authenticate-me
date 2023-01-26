const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, Sequelize, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

module.exports = router;
