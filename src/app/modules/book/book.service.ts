import { Book } from '@prisma/client'
import { prisma } from '../../shared/prisma'

const createBook = async (data: Book): Promise<Book | null> => {
  const result = await prisma.book.create({ data })
  return result
}

const getBooks = async (): Promise<Book[] | null> => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  })
  return result
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

export const BooksService = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
}
