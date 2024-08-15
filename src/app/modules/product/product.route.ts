import express from 'express'
import { ProductController } from './product.controller'
const router = express.Router()

router.post('/create-product', ProductController.createProduct)
router.get('/', ProductController.getAllProducts)
router.delete('/delete/:id', ProductController.deleteProduct)
router.patch('/update/:id', ProductController.updateProduct)

export default router
