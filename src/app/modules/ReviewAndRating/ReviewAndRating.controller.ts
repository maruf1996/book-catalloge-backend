import { NextFunction, Request, Response } from 'express'
import { ReviewService } from './ReviewAndRating.service'

const createReviw = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...data } = req.body
    const result = await ReviewService.createReview(data)
    res.status(200).json({
      status: 'success',
      message: 'Review created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ReviewService.getReviws()
    res.status(200).json({
      status: 'success',
      message: 'Reviw Retrive successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const result = await ReviewService.getReviw(id)
    res.status(200).json({
      status: 'success',
      message: 'Review getched successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { ...data } = req.body
    const result = await ReviewService.updateReview(id, data)
    res.status(200).json({
      status: 'success',
      message: 'Review updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const result = await ReviewService.deleteReview(id)
    res.status(200).json({
      status: 'success',
      message: 'Review deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const ReviewsController = {
  createReviw,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
}
