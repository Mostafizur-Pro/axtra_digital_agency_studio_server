import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IProduct } from './product.interface'
import { ProductService } from './product.service'

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...product } = req.body

    // console.log('data', product)
    const result = await ProductService.createProduct(product)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product Placed successfully',
      data: result,
    })
  }
)

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts()

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully !',
    data: result,
  })
})
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await ProductService.deleteProduct(id)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully !',
    data: result,
  })
})
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  console.log('data', id, updatedData)
  const result = await ProductService.updateProduct(id, updatedData)

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully !',
    data: result,
  })
})
export const ProductController = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
}
