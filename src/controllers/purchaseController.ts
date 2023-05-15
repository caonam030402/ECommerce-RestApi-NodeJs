import { Request } from 'express'
import asyncHandler from 'express-async-handler'
import httpStatus from 'http-status'
import purchaseService from '~/services/purchaseService'
import { IUser } from '~/types/userType'
import successResponse from '~/utils/utils'
interface IRequest extends Request {
  user?: IUser
}

const purchaseController = {
  addToCart: asyncHandler(async (req: IRequest, res) => {
    const { product_id, buy_count } = req.body
    if (req.user !== undefined) {
      const purchase = await purchaseService.addToCart({ product_id, buy_count }, req.user)
      res.status(httpStatus.OK).json(successResponse('Thêm sản phẩm vào giỏ hàng thành công', purchase))
    }
  })
}

export default purchaseController