import { Category } from '@prisma/client'
import { prisma } from '../../shared/prisma'

const createCategory = async (data: Category): Promise<Category | null> => {
  const result = await prisma.category.create({ data })
  return result
}

const getCategories = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany()
  return result
}

const getCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
  })
  return result
}

const updateCategory = async (
  id: string,
  payload: Partial<Category>,
): Promise<Partial<Category> | null> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  })
  return result
}

const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({
    where: { id },
  })
  return result
}

export const CategoriesService = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
}
