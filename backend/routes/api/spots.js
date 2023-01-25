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
                attributes: []
            },
            {
                model: SpotImage,
                attributes: ["url"],
                where: {
                    preview: true
                }
            }
            ],
            // attributes: {
            //     include: [Sequelize.fn("AVG", Sequelize.col(Review.stars), "avgRating")]
            // }



        })
        return res.json(spots);
    })


router.get('/current',
    async (req, res) => {
        const { user } = req;


        return res.json(user)
    }
)

module.exports = router;
