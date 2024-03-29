import authRoute from '../routes/authRoute'
import userRoute from '../routes/userRoute'
import productRoute from '../routes/productRoute'
import categoryRoute from './categoryRoute'
import purchaseRoute from '../routes/purchaseRoute'
import dashboardRoute from '../routes/dashboardRoute'
import vnpPaymentRoute from '../routes/vnpPaymentRoute'
import promotionRoute from '../routes/promotionRoute'
import express from 'express'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/',
    route: authRoute
  },
  {
    path: '/',
    route: userRoute
  },
  {
    path: '/products',
    route: productRoute
  },
  {
    path: '/categories',
    route: categoryRoute
  },
  {
    path: '/purchases',
    route: purchaseRoute
  },
  { path: '/dashboard', route: dashboardRoute },
  { path: '/payment', route: vnpPaymentRoute },
  { path: '/promotions', route: promotionRoute }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
