const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const bookingsRouter = require('./bookings.js');
const reviewsRouter = require('./review.js');
const spotImagesRouter = require('./spotImage.js');
const reviewImagesRouter = require('./reviewImage.js');
const { restoreUser } = require('../../utils/auth.js');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/bookings', bookingsRouter);

router.use('/reviews', reviewsRouter);

router.use('/spot-images', spotImagesRouter);

router.use('/review-images', reviewImagesRouter);
//Test the API Router
// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });
//Test the database
// router.get('/test', async function (req, res) {

//     // const testRes = await SpotImage.findByPk(1, {
//     //     include: [{ model: Spot }]
//     // });
//     const testRes = await Review.findAll({});
//     res.json(testRes)
// })

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user: user });
// });


// router.get(
//     '/restore-user',
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//     '/require-auth',
//     requireAuth,
//     (req, res) => {
//         return res.json(req.user);
//     }
// );

module.exports = router;
