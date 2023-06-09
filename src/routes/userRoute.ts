import express from 'express'
import { upload } from '../configs/storageUpload'
import userController from '../controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'
const router = express.Router()

router.get('/me', authMiddleware.verifyToken, userController.getUser)
router.put('/user', authMiddleware.verifyToken, userController.updateUser)
router.post('/user/upload-avatar', upload.any(), userController.uploadAvatar)
router.get('/images/:filename', userController.getAvatar)
router.get('/address', userController.getAddress)

export default router
