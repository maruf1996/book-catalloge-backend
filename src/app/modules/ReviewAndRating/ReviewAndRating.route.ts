import express from 'express'
import { ReviewsController } from './ReviewAndRating.controller'

const router = express.Router()

router.post('/create-review', ReviewsController.createReviw)
router.get('/:id', ReviewsController.getReview)
router.patch('/:id', ReviewsController.updateReview)
router.delete('/:id', ReviewsController.deleteReview)
router.get('/', ReviewsController.getReviews)

export const ReviewsRoutes = router
