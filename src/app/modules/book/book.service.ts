/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book } from '@prisma/client'
import httpStatus from 'http-status'
import ApiError from '../../../Errors/ApiError'
import { prisma } from '../../shared/prisma'

const createBook = async (data: Book): Promise<Book | null> => {
  const result = await prisma.book.create({ data })
  return result
}

const getBooks = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, minPrice, maxPrice, ...filterData } =
    options

  const page = parseInt(options?.page) || 1
  const size = parseInt(options?.size) || 10
  const skip = size * page - size || 0
  const take = size || 10
  const minPriceFloat = parseFloat(minPrice) || 0
  const maxPriceFloat = parseFloat(maxPrice) || 0

  const where = {
    AND: [] as any[],
  }

  if (searchTerm) {
    where.AND.push({
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { author: { contains: searchTerm, mode: 'insensitive' } },
        { genre: { contains: searchTerm, mode: 'insensitive' } },
      ],
    })
  }

  if (filterData.category) {
    where.AND.push({
      category: {
        title: {
          equals: filterData.category as string,
          mode: 'insensitive',
        },
      },
    })
  }

  if (maxPrice) {
    where.AND.push({
      price: {
        lte: maxPriceFloat,
      },
    })
  }

  if (minPrice) {
    where.AND.push({
      price: {
        gte: minPriceFloat,
      },
    })
  }

  const result = await prisma.book.findMany({
    include: {
      category: true,
      ReviewAndRating: true,
    },
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder as 'asc' | 'desc',
    },
    where,
  })

  const total = await prisma.book.count({ skip, take, where })
  const totalPages = Math.ceil(total / size)

  return {
    meta: {
      page,
      size,
      total,
      totalPages,
    },
    data: result,
  }
}

const getBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: { id },
    include: {
      category: true,
    },
  })
  return result
}

const updateBook = async (
  id: string,
  payload: Partial<Book>,
): Promise<Partial<Book> | null> => {
  const result = await prisma.book.update({
    where: { id },
    data: payload,
  })
  return result
}

const deleteBook = async (id: string) => {
  const result = await prisma.book.delete({
    where: { id },
  })
  return result
}

const getBooksByCategoryId = async (categoryId: string, options: any) => {
  const page = parseInt(options?.page) || 1
  const size = parseInt(options?.size) || 10
  const skip = size * page - size || 0
  const take = size || 10

  const isExistCategory = await prisma.category.findMany({})

  if (!isExistCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category Not Exist')
  }

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      ReviewAndRating: true,
    },
  })

  const total = await prisma.book.count({ skip, take })
  const totalPages = Math.ceil(total / size)

  return {
    meta: {
      page,
      size,
      total,
      totalPages,
    },
    data: result,
  }
}

export const BooksService = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  getBooksByCategoryId,
}
