import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import { ApiError } from '../middlewares/errorHandlers'
import productService from '../services/productService'
import successResponse from '../utils/utils'

interface IQuery {
  rating?: { $gt: number }
  category?: string
  price?: { $gt?: number; $lte?: number }
  $and?: Array<Record<string, any>>
  createdAt?: string
  sold?: number
  view?: number
  sort?: Record<string, number>
  order?: string
}

interface ISort {
  view?: string
  sold?: string
  price?: string
  desc?: string
}

const productController = {
  addProduct: asyncHandler(async (req, res) => {
    try {
      const productBody = req.body
      const imageUrls = (req.files as Array<Express.Multer.File>).map((file: Express.Multer.File) => {
        const fileUrl = req.protocol + '://' + req.get('host') + '/v1/images/' + file.filename
        return fileUrl
      })

      const objetProductBody = {
        ...productBody,
        image: imageUrls[0],
        rating: 0,
        view: 0,
        sold: 0
      }

      const product = await productService.createProduct(objetProductBody)
      res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', data: product })
    } catch (error) {
      res.status(500).json({ success: false, message: 'Thêm thất bại' })
    }
  }),

  addProducts: asyncHandler(async (req, res) => {
    const bodyProducts = req.body
    const products = await productService.createProduct(bodyProducts)
    res.status(201).json({ success: true, message: 'Thêm sản phẩm thành công', data: products })
  }),

  deleteProducts: asyncHandler(async (req, res) => {
    await productService.deleteProductById(req.params.id)
    res.status(201).json({ success: true, message: 'Xóa sản phẩm thành công' })
  }),

  getProductDetail: asyncHandler(async (req, res) => {
    const productDetail = await productService.getProductById(req.params.id)
    res.status(httpStatus.CREATED).json(successResponse('Lấy sản phẩm thành công', productDetail))
  }),

  getProducts: asyncHandler(async (req, res) => {
    const paginate = await productService.paginateAndQueryProduct(req)
    res.status(httpStatus.OK).json(
      successResponse('Lấy sản phẩm thành công thành công', {
        products: paginate.docs,
        pagination: { page: paginate.page, page_size: paginate.totalPages, limit: paginate.limit }
      })
    )
  }),
  getAProduct: asyncHandler(async (req, res) => {
    const findProduct = await productService.getProductById(req.params.id)
    if (!findProduct) throw new ApiError('Không tìm thấy sản phẩm', httpStatus.UNPROCESSABLE_ENTITY, 'message')
  }),

  updateProduct: asyncHandler(async (req, res) => {
    const productBody = req.body

    if (req.files) {
      const imageUrls = (req.files as Array<Express.Multer.File>).map((file: Express.Multer.File) => {
        const fileUrl = req.protocol + '://' + req.get('host') + '/v1/images/' + file.filename
        return fileUrl
      })
      productBody.images = Image
    }

    const objetProductBody = {
      ...productBody
    }

    const productUpdate = await productService.updateAProduct(req.body.name, objetProductBody)
    res.status(httpStatus.CREATED).json(successResponse('Cập nhập sản phẩm thành công', productUpdate))
  })
}
export default productController
