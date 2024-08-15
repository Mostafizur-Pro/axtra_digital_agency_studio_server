import { Model, Schema, model } from 'mongoose'
import { IProduct } from './product.interface'

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: String, required: true },
  price: { type: String, required: true },
})

export const Product = model<IProduct>('Product', productSchema)
