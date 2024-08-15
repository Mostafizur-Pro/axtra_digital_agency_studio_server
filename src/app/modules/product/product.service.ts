import ApiError from '../../../errors/ApiError'
import { IProduct } from './product.interface'
import { Product } from './product.model'

const getAllProducts = async (): Promise<IProduct[] | null> => {
  const result = await Product.find()
  return result
}

const createProduct = async (product: IProduct): Promise<IProduct | null> => {
  const createUser = await Product.create(product)
  if (!createUser) {
    throw new ApiError(400, 'Failed to create Product')
  }

  return createUser
}

const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Product.findByIdAndDelete(id)
  return result
}
const updateProduct = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const result = await Product.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

export const ProductService = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
}
