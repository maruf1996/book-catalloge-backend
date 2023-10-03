import { ReviewAndRating } from '@prisma/client'
import { prisma } from '../../shared/prisma'

const createReview = async (
  data: ReviewAndRating,
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.create({ data })
  return result
}

const getReviws = async (): Promise<ReviewAndRating[] | null> => {
  const result = await prisma.reviewAndRating.findMany({
    include: {
      user: true,
      book: true,
    },
  })
  return result
}

const getReviw = async (id: string): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.findUnique({
    where: { id },
    include: {
      user: true,
      book: true,
    },
  })
  return result
}

const updateReview = async (
  id: string,
  payload: Partial<ReviewAndRating>,
): Promise<Partial<ReviewAndRating> | null> => {
  const result = await prisma.reviewAndRating.update({
    where: { id },
    data: payload,
  })
  return result
}

const deleteReview = async (id: string) => {
  const result = await prisma.reviewAndRating.delete({
    where: { id },
  })
  return result
}

export const ReviewService = {
  createReview,
  getReviws,
  getReviw,
  updateReview,
  deleteReview,
}
