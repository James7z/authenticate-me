const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//review id check
const spotImageIdCheck = async (req, res, next) => {
    const spotImageId = req.params.spotImageId
    const spotImage = await SpotImage.findByPk(spotImageId);
    if (!spotImage) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
    return next();
}

const userIdCheck = async (req, res, next) => {
    const { user } = req;
    const spotImageId = req.params.spotImageId
    const spotImage = await SpotImage.findByPk(spotImageId,
        {
            include: [{
                model: Spot,
                attributes: ['ownerId']
            }],
            attributes: ['spotId']
        });
    if (user.id != spotImage.Spot.ownerId) {
        const err = new Error('Authentication required');
        err.title = 'Authentication required';
        err.errors = ['Only the owner of the Spot has the Authentication'];
        err.status = 401;
        return next(err);
    }
    return next();
}


router.delete('/:spotImageId', requireAuth, spotImageIdCheck, userIdCheck, async (req, res) => {
    const spotImageId = req.params.spotImageId
    const spotImage = await SpotImage.findByPk(spotImageId);

    spotImage.destroy();

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;
