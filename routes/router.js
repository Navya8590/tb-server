const express = require('express')
const userController = require('../controllers/userController')
const blogController = require('../controllers/blogController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router = new express.Router()

// register - post
router.post('/register',userController.registerController)
// login - post
router.post('/login',userController.loginController)
// add-blog - post
router.post('/add-blog',jwtMiddleware,multerMiddleware.single('blogImage'),blogController.addBlogController)
// user-blog - get
router.get('/user-blogs',jwtMiddleware,blogController.getUserBlogsController)
// all-blog - get
router.get('/all-blogs',jwtMiddleware,blogController.getAllBlogsController)
// edit-blog-put
router.put('/blogs/:id/edit',jwtMiddleware,multerMiddleware.single('blogImage'),blogController.editBlogController)
// delete blog
router.delete('/blogs/:id/remove',jwtMiddleware,blogController.removeBlogController)
// edit-user put
router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editUserController)



module.exports = router